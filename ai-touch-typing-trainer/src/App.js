"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var Layout_1 = __importDefault(require("./components/Layout"));
var Settings_1 = __importDefault(require("./pages/Settings"));
var Play_1 = __importDefault(require("./pages/Play"));
var Drills_1 = __importDefault(require("./pages/Drills"));
var Analytics_1 = __importDefault(require("./pages/Analytics"));
var AppContext_1 = require("./context/AppContext");
require("./App.css");
// Page components
var Home = function () { return <div className="text-3xl font-bold">Home</div>; };
function App() {
    return (<AppContext_1.AppProvider>
      <react_router_dom_1.BrowserRouter>
        <Layout_1.default>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<Home />}/>
            <react_router_dom_1.Route path="/play" element={<Play_1.default />}/>
            <react_router_dom_1.Route path="/drills" element={<Drills_1.default />}/>
            <react_router_dom_1.Route path="/analytics" element={<Analytics_1.default />}/>
            <react_router_dom_1.Route path="/settings" element={<Settings_1.default />}/>
          </react_router_dom_1.Routes>
        </Layout_1.default>
      </react_router_dom_1.BrowserRouter>
    </AppContext_1.AppProvider>);
}
exports.default = App;
