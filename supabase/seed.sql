-- Seed Charities Data

INSERT INTO public.charities (id, name, description, logo_url, website, is_featured, is_active)
VALUES
  (gen_random_uuid(), 'Global Water Initiative', 'Providing clean drinking water to developing communities globally.', 'https://images.unsplash.com/photo-1541604547963-885fb5e76ec0?w=500&auto=format&fit=crop&q=60', 'https://example.org/water', true, true),
  (gen_random_uuid(), 'Ocean Cleanup Foundation', 'Removing plastic and waste from the world''s oceans and promoting marine health.', 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=500&auto=format&fit=crop&q=60', 'https://example.org/ocean', false, true),
  (gen_random_uuid(), 'Education For All', 'Building schools and providing digital tech to underprivileged children.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60', 'https://example.org/education', true, true),
  (gen_random_uuid(), 'Wildlife Protection Trust', 'Safeguarding endangered species and preserving natural habitats.', 'https://images.unsplash.com/photo-1506042100806-2d334e34151a?w=500&auto=format&fit=crop&q=60', 'https://example.org/wildlife', false, true)
ON CONFLICT DO NOTHING;

-- Note: Demo User & Admin and their scores/subscriptions will be handled
-- either via API after creating accounts through the UI, or by running manual scripts later.
-- For the assignment, the Supabase authentication API should be used to create the user,
-- then their `role` can be updated to 'admin' manually in the Supabase UI.
