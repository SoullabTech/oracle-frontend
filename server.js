// server.js
import express         from 'express';
import bodyParser      from 'body-parser';
import dotenv          from 'dotenv';
import { OpenAI }      from 'openai';

dotenv.config();
const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// A simple “tool” that returns the current time in a named timezone
function getTimeTool({ timezone }) {
  return new Date().toLocaleString('en-US', { timeZone: timezone });
}

app.get('/api/chat/stream', async (req, res) => {
  const userPrompt = req.query.prompt;
  if (!userPrompt) return res.status(400).end();

  // — SSE headers —
  res.setHeader('Content-Type',        'text/event-stream');
  res.setHeader('Cache-Control',       'no-cache');
  res.setHeader('Connection',          'keep-alive');

  // heartbeat ping so proxy & browser don’t drop
  const ping = setInterval(() => res.write(': ping\n\n'), 20_000);

  try {
    // Kick off a streaming chat completion with a function definition
    const stream = await openai.chat.completions.create(
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You have a tool: getTime({timezone})' },
          { role: 'user',   content: userPrompt }
        ],
        functions: [
          {
            name: 'getTime',
            description: 'Returns the current time in a given timezone',
            parameters: {
              type: 'object',
              properties: {
                timezone: {
                  type: 'string',
                  description: 'IANA timezone name, e.g. "Europe/London"'
                }
              },
              required: ['timezone']
            }
          }
        ],
        stream: true
      },
      { responseType: 'stream' }
    );

    let fnCallArgs = '';      // to accumulate function_call.arguments JSON

    for await (const chunk of stream) {
      const delta = chunk.choices[0].delta;

      // — 1) If model is chunking out a function call —
      if (delta.function_call) {
        fnCallArgs += delta.function_call.arguments ?? '';
        continue;
      }

      // — 2) If we’ve finished function_call but now no content —
      if (fnCallArgs && delta.content === undefined) {
        // parse and run the tool
        const args = JSON.parse(fnCallArgs);
        const output = getTimeTool(args);

        // push tool result into the SSE stream
        res.write(
          `data: ${JSON.stringify({
            role: 'tool',
            name: 'getTime',
            text: output
          })}\n\n`
        );

        fnCallArgs = '';
        continue;
      }

      // — 3) Normal assistant content —
      if (delta.content) {
        res.write(
          `data: ${JSON.stringify({
            role: 'assistant',
            text: delta.content
          })}\n\n`
        );
      }
    }

    // close out
    res.write(`event: done\ndata: {}\n\n`);
  } catch (err) {
    console.error(err);
    res.write(`event: error\ndata: {}\n\n`);
  } finally {
    clearInterval(ping);
    res.end();
  }
});

app.listen(4000, () => console.log('API on http://localhost:4000'));
