// Minimal React type declarations
declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useContext: any;
  export const useReducer: any;
  export const useCallback: any;
  export const useMemo: any;
  export const useRef: any;
  export const useImperativeHandle: any;
  export const useLayoutEffect: any;
  export const useDebugValue: any;
  export const useDeferredValue: any;
  export const useTransition: any;
  export const useId: any;
  export const useSyncExternalStore: any;
  export const useInsertionEffect: any;
  export const createElement: any;
  export const createContext: any;
  export const forwardRef: any;
  export const memo: any;
  export const lazy: any;
  export const Suspense: any;
  export const Fragment: any;
  export const StrictMode: any;
  export const cloneElement: any;
  export const isValidElement: any;
  export const Component: any;
  export const PureComponent: any;
  type ReactNode = any;
  export default any;
}

declare module 'react-dom/client' {
  export const createRoot: any;
  export const hydrateRoot: any;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
}

declare module 'react-router-dom' {
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const Link: any;
  export const NavLink: any;
  export const useNavigate: any;
  export const useParams: any;
  export const useLocation: any;
  export const Outlet: any;
}

// Add JSX namespace
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}