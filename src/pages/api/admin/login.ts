import type { APIRoute } from 'astro';
import { createFallbackSession, credentialsValid, fallbackAuthConfigured, sessionCookie } from '../../../lib/auth';
import { authConfigured, signIn } from '../../../lib/supabase';
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const identity=String(form.get('identity')||form.get('email')||''),pass=String(form.get('password')||'');
  if(authConfigured){const result=await signIn(identity,pass);if(result?.access_token)return new Response(null,{status:303,headers:{Location:'/admin','Set-Cookie':sessionCookie(result.access_token,result.expires_in||3600)}})}
  if(fallbackAuthConfigured&&credentialsValid(identity,pass))return new Response(null,{status:303,headers:{Location:'/admin','Set-Cookie':sessionCookie(await createFallbackSession())}});
  return new Response(null,{status:303,headers:{Location:'/admin?error=1'}});
};
