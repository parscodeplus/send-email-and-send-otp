import { Image } from 'next/image';
import { appConfig } from '@/config/app';
import { getProject } from '@/config/directus';
import { EXPO_PROJECT_ID } from '@/config/env';
import { getDirectusFile } from '@/utils/directus';
import { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const project = await getProject(EXPO_PROJECT_ID);

  return {
    id:EXPO_PROJECT_ID,
    name: project.title,
    short_name: project.manifest_short_name,
    description: project.meta_description ?? '',
    start_url: '/',
    orientation: 'portrait',
    display: 'standalone',
    background_color: '#fff',
    theme_color: appConfig.colors.primary[500],
    icons: [
      {
        src: getDirectusFile(project.manifest_icon ?? project.logo),
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
