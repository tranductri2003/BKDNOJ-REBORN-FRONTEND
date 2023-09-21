// https://stackoverflow.com/a/61602724/13020109
// ScrollToTop helps scroll to top every time ReactRouter 
// make a transition
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}