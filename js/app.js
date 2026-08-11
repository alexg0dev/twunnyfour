(function () {
  const { createClient } = supabase;
  const sb = createClient(window.TW24.SUPABASE_URL, window.TW24.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  window.TW24.supabase = sb;

  async function getSession() {
    const { data } = await sb.auth.getSession();
    return data.session;
  }

  async function requireAuth(returnTo) {
    const session = await getSession();
    if (!session) {
      const next = encodeURIComponent(returnTo || location.pathname + location.search);
      location.href = `login.html?next=${next}`;
      return null;
    }
    return session;
  }

  async function addToCart(product, qty = 1) {
    const session = await requireAuth(location.pathname + location.search + location.hash);
    if (!session) return { ok: false, reason: "auth" };

    const { data: existing } = await sb
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", session.user.id)
      .eq("product_id", product.id)
      .maybeSingle();

    if (existing) {
      const { error } = await sb
        .from("cart_items")
        .update({
          quantity: existing.quantity + qty,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      if (error) return { ok: false, reason: error.message };
    } else {
      const { error } = await sb.from("cart_items").insert({
        user_id: session.user.id,
        product_id: product.id,
        product_name: product.name,
        product_category: product.category || null,
        price: product.price,
        quantity: qty,
      });
      if (error) return { ok: false, reason: error.message };
    }

    await refreshCartBadge();
    toast(`${product.name} added to cart`);
    return { ok: true };
  }

  async function getCart() {
    const session = await getSession();
    if (!session) return [];
    const { data, error } = await sb
      .from("cart_items")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: true });
    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  }

  async function updateQty(id, quantity) {
    if (quantity <= 0) return removeItem(id);
    const { error } = await sb
      .from("cart_items")
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) toast(error.message, true);
    await refreshCartBadge();
  }

  async function removeItem(id) {
    const { error } = await sb.from("cart_items").delete().eq("id", id);
    if (error) toast(error.message, true);
    await refreshCartBadge();
  }

  async function clearCart() {
    const session = await getSession();
    if (!session) return;
    await sb.from("cart_items").delete().eq("user_id", session.user.id);
    await refreshCartBadge();
  }

  async function refreshCartBadge() {
    const el = document.querySelector("[data-cart-count]");
    if (!el) return;
    const session = await getSession();
    if (!session) {
      el.textContent = "0";
      el.classList.add("opacity-0");
      return;
    }
    const items = await getCart();
    const count = items.reduce((n, i) => n + i.quantity, 0);
    el.textContent = String(count);
    el.classList.toggle("opacity-0", count === 0);
  }

  function toast(message, isError) {
    let host = document.getElementById("tw24-toast");
    if (!host) {
      host = document.createElement("div");
      host.id = "tw24-toast";
      host.className =
        "fixed bottom-24 left-1/2 z-[80] -translate-x-1/2 flex flex-col gap-2 pointer-events-none";
      document.body.appendChild(host);
    }
    const node = document.createElement("div");
    node.className = `pointer-events-auto rounded-md px-4 py-3 text-sm font-medium shadow-lg border ${
      isError
        ? "bg-[#1a1010] border-red-500/40 text-red-200"
        : "bg-[#12141c] border-white/10 text-white"
    }`;
    node.textContent = message;
    host.appendChild(node);
    setTimeout(() => {
      node.style.opacity = "0";
      node.style.transition = "opacity .3s";
      setTimeout(() => node.remove(), 300);
    }, 2400);
  }

  function mountChat() {
    if (document.getElementById("tw24-chat")) return;
    const root = document.createElement("div");
    root.id = "tw24-chat";
    root.innerHTML = `
      <button type="button" id="tw24-chat-toggle" aria-label="Open support chat"
        class="fixed bottom-6 right-6 z-[70] h-14 w-14 rounded-full bg-[#e60000] text-white shadow-[0_0_40px_rgba(230,0,0,.45)] grid place-items-center hover:scale-105 transition-transform">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
        </svg>
      </button>
      <div id="tw24-chat-panel" class="fixed bottom-24 right-6 z-[70] w-[min(92vw,360px)] origin-bottom-right scale-95 opacity-0 pointer-events-none transition-all duration-200 rounded-2xl border border-white/10 bg-[#0f1118] shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#e60000]">
          <div>
            <p class="text-sm font-semibold text-white">TwunnyFour Support</p>
            <p class="text-[11px] text-white/80">Usually replies in under a minute</p>
          </div>
          <button type="button" id="tw24-chat-close" class="text-white/90 hover:text-white text-xl leading-none">&times;</button>
        </div>
        <div id="tw24-chat-log" class="h-64 overflow-y-auto p-4 space-y-3 text-sm"></div>
        <form id="tw24-chat-form" class="flex gap-2 p-3 border-t border-white/10">
          <input id="tw24-chat-input" type="text" placeholder="Ask about email or endpoint security..."
            class="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#e60000]/ />
          <button class="rounded-lg bg-[#e60000] px-3 py-2 text-sm font-semibold text-white">Send</button>
        </form>
      </div>`;
    document.body.appendChild(root);

    const panel = document.getElementById("tw24-chat-panel");
    const log = document.getElementById("tw24-chat-log");
    const input = document.getElementById("tw24-chat-input");
    let open = false;

    function push(who, text) {
      const row = document.createElement("div");
      row.className = who === "bot" ? "text-white/80" : "text-right";
      row.innerHTML = `<span class="inline-block max-w-[85%] rounded-xl px-3 py-2 ${
        who === "bot" ? "bg-white/5 border border-white/10" : "bg-[#e60000] text-white"
      }">${text}</span>`;
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
    }

    push(
      "bot",
      "Hi — I'm TwunnyFour Assist. Ask about bundles, pricing, or deploying a capability.",
    );

    function setOpen(v) {
      open = v;
      panel.classList.toggle("opacity-0", !v);
      panel.classList.toggle("pointer-events-none", !v);
      panel.classList.toggle("scale-95", !v);
      panel.classList.toggle("scale-100", v);
    }

    document.getElementById("tw24-chat-toggle").onclick = () => setOpen(!open);
    document.getElementById("tw24-chat-close").onclick = () => setOpen(false);
    document.getElementById("tw24-chat-form").onsubmit = (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      push("user", q);
      input.value = "";
      setTimeout(() => {
        const lower = q.toLowerCase();
        let reply =
          "For a tailored stack, start with Email Security + Endpoint EDR, then layer Identity Protection.";
        if (lower.includes("price") || lower.includes("cost"))
          reply = "Plans start at $10/user/mo. Capabilities are billed per node. See Pricing for details.";
        else if (lower.includes("cart") || lower.includes("login"))
          reply = "Add to cart requires login so your deployments sync across devices. Use the account icon to sign in.";
        else if (lower.includes("phish") || lower.includes("email"))
          reply = "Our Email Security Cloud Gateway blocks phishing, quishing, and brand impersonation with AI link scanning.";
        else if (lower.includes("endpoint") || lower.includes("ransomware"))
          reply = "Endpoint Threat Prevention + Falcon Insight give you NGAV, exploit prevention, and real-time EDR.";
        push("bot", reply);
      }, 450);
    };
  }

  async function hydrateNavAuth() {
    const session = await getSession();
    document.querySelectorAll("[data-auth-link]").forEach((a) => {
      if (session) {
        a.setAttribute("href", "login.html");
        a.setAttribute("title", "Account / Sign out");
        a.dataset.signedIn = "1";
      } else {
        a.setAttribute("href", "login.html");
        a.dataset.signedIn = "0";
      }
    });
    document.querySelectorAll("[data-user-email]").forEach((el) => {
      el.textContent = session?.user?.email || "";
    });
    await refreshCartBadge();
  }

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-add-cart]");
    if (!btn) return;
    e.preventDefault();
    const id = btn.getAttribute("data-add-cart");
    const product = window.TW24_findProduct?.(id);
    if (!product) return toast("Product not found", true);
    btn.disabled = true;
    await addToCart(product);
    btn.disabled = false;
  });

  sb.auth.onAuthStateChange(() => {
    hydrateNavAuth();
  });

  document.addEventListener("DOMContentLoaded", () => {
    mountChat();
    hydrateNavAuth();
  });

  window.TW24.cart = {
    addToCart,
    getCart,
    updateQty,
    removeItem,
    clearCart,
    refreshCartBadge,
    requireAuth,
    getSession,
    toast,
  };
})();
