import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import CaesarCipher from "@/pages/caesar";
import VigenereCipher from "@/pages/vigenere";
import AtbashCipher from "@/pages/atbash";
import BinaryEncoding from "@/pages/binary";
import ReverseCipher from "@/pages/reverse";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/caesar" component={CaesarCipher} />
      <Route path="/vigenere" component={VigenereCipher} />
      <Route path="/atbash" component={AtbashCipher} />
      <Route path="/binary" component={BinaryEncoding} />
      <Route path="/reverse" component={ReverseCipher} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
