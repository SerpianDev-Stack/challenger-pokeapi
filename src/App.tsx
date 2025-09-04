import { GlobalStyle } from "./styles/globalStyle";
import { CustomThemeProvider } from "./contexts/themeContext";
import { AppRoutes } from "./pages/routes";

function App() {



  return (
    <>
      <CustomThemeProvider>
        <GlobalStyle />
        <AppRoutes />
      </CustomThemeProvider>
    </>
  )
}

export default App
