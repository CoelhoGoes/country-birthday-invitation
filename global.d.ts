// Next.js só declara tipos ambientes para *.module.css (CSS Modules).
// Isso cobre o import de efeito colateral do CSS global em app/layout.tsx,
// que o webpack do Next já resolve em tempo de build.
declare module "*.css";
