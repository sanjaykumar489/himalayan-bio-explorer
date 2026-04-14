import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const demoUsers = [
      { email: "admin@hbis.demo", password: "admin123456", role: "admin", name: "Admin User" },
      { email: "researcher@hbis.demo", password: "researcher123456", role: "researcher", name: "Dr. Research" },
      { email: "public@hbis.demo", password: "public123456", role: "public", name: "Public User" },
    ];

    const results = [];

    for (const u of demoUsers) {
      // Check if user exists
      const { data: existing } = await admin.auth.admin.listUsers();
      const found = existing?.users?.find((x: any) => x.email === u.email);

      let userId: string;
      if (found) {
        userId = found.id;
        results.push({ email: u.email, status: "exists", userId });
      } else {
        const { data, error } = await admin.auth.admin.createUser({
          email: u.email,
          password: u.password,
          email_confirm: true,
          user_metadata: { display_name: u.name },
        });
        if (error) {
          results.push({ email: u.email, status: "error", error: error.message });
          continue;
        }
        userId = data.user.id;
        results.push({ email: u.email, status: "created", userId });
      }

      // Ensure role exists (upsert)
      await admin.from("user_roles").upsert(
        { user_id: userId, role: u.role },
        { onConflict: "user_id,role" }
      );
    }

    // Seed some species data
    const { count } = await admin.from("species").select("*", { count: "exact", head: true });
    if (!count || count === 0) {
      await admin.from("species").insert([
        { common_name: "Snow Leopard", scientific_name: "Panthera uncia", category: "mammal", conservation_status: "VU", description: "The ghost of the mountains, found in high-altitude alpine regions.", habitat: "Alpine meadows, rocky outcrops", altitude_range: "3000-5500m" },
        { common_name: "Himalayan Monal", scientific_name: "Lophophorus impejanus", category: "bird", conservation_status: "LC", description: "National bird of Nepal, known for its iridescent plumage.", habitat: "Subalpine forests", altitude_range: "2400-4500m" },
        { common_name: "Red Panda", scientific_name: "Ailurus fulgens", category: "mammal", conservation_status: "EN", description: "Small arboreal mammal native to eastern Himalayas.", habitat: "Temperate forests with bamboo understory", altitude_range: "2200-4800m" },
        { common_name: "Rhododendron arboreum", scientific_name: "Rhododendron arboreum", category: "flora", conservation_status: "LC", description: "National flower of Nepal, evergreen tree with brilliant red flowers.", habitat: "Himalayan slopes", altitude_range: "1500-3600m" },
        { common_name: "Himalayan Black Bear", scientific_name: "Ursus thibetanus laniger", category: "mammal", conservation_status: "VU", description: "Subspecies of the Asian black bear found across the Himalayas.", habitat: "Mixed deciduous and coniferous forests", altitude_range: "1200-3700m" },
        { common_name: "Satyr Tragopan", scientific_name: "Tragopan satyra", category: "bird", conservation_status: "NT", description: "Pheasant species with brilliant crimson plumage.", habitat: "Dense moist oak-rhododendron forests", altitude_range: "2400-4200m" },
        { common_name: "Blue Poppy", scientific_name: "Meconopsis betonicifolia", category: "flora", conservation_status: "LC", description: "Iconic alpine flower of the Himalayas with brilliant blue petals.", habitat: "Alpine meadows", altitude_range: "3500-5000m" },
        { common_name: "Himalayan Tahr", scientific_name: "Hemitragus jemlahicus", category: "mammal", conservation_status: "NT", description: "Large wild goat native to the Himalayas.", habitat: "Steep rocky hillsides and alpine grasslands", altitude_range: "2500-5000m" },
      ]);
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Setup error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
