// Add Node.js type definitions
import { spawn } from 'child_process';
import * as path from 'path';

const pythonScript = path.join(__dirname, '..', 'fanar_stdio.py');

const pythonProcess = spawn('python', [pythonScript], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});

pythonProcess.on('close', (code: number) => {
  console.log(`Python server exited with code ${code}`);
}); 