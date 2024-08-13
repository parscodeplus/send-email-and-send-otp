"use server"
import z from "zod"
import { createServerAction } from "zsa"
import fs from 'fs';
import path from 'path';

export const up_manifest = createServerAction()
  .input(
    z.object({
      name:z.string(),
      scope:z.string(),
      short_name:z.string(),
      start_url:z.string()
    })
  )
  .handler(async ({input}) => {
  
      try {
        const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
        let manifest = fs.readFileSync(manifestPath, 'utf-8');
        let manifestObject = JSON.parse(manifest);
        const { name, scope,short_name,start_url } = {name:input.name,scope:input.scope,start_url:input.start_url,short_name:input.short_name};
        if (name) manifestObject.name = name;
        if (scope) manifestObject.scope = scope;
        if (short_name) manifestObject.short_name = short_name;
        if (start_url) manifestObject.start_url = start_url;


    
        fs.writeFileSync(manifestPath, JSON.stringify(manifestObject, null, 2));
    
        return {
          accepted: { message: 'Manifest updated successfully' }
        };
      } catch (error) {
        return { message: "Unable to", status: 500 };
      }
  })

