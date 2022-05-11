import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function SignOut(){
  const { signOut } = useContext(AuthContext);

  function handleSignOut(){
    signOut()
  }
  return(
    <Button 
      color='gray.300' 
      variant='outline' ml='4'
      _hover={{ color: '#D53F8C', borderColor: '#D53F8C' }}
      onClick={handleSignOut}
      >
      Sair
    </Button>
  )
}