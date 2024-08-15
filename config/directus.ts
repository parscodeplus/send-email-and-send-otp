// ????: /config/directus.ts
import fs from 'fs';
import path from 'path';

export async function getProject(projectId: string) {
  const dataPath = path.join(process.cwd(), 'public', 'projects.json');
  const projects = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  return projects[projectId];
}
