import Header from "./components/Header/Header";


const App = () => {
  return (
    
    <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
  )
}

export default App