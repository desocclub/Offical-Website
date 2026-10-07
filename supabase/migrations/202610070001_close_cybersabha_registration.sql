update public.events
set registration_deadline = now() - interval '1 minute'
where slug = 'cybersabha-2';