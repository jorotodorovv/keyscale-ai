// Minimal Vite type declarations
declare module 'vite' {
  export const defineConfig: any;
}

declare module '@vitejs/plugin-react' {
  const react: any;
  export default react;
}