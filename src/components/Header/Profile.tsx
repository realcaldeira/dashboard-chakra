import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile(){
  return(
    <Flex align='center'>
    <Box mr='4' textAlign='right'>
      <Text>Lucas Caldeira</Text>
      <Text
        color='gray.300'
        fontSize='small'
      >mrrealcaldeira@gmail.com</Text>
    </Box>

    <Avatar size='md' name="Lucas Caldeira" src='https://github.com/realcaldeira.png' />
  </Flex>
  )
}