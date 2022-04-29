import { Stack, Button, Box } from '@chakra-ui/react';
import { PaginationITem } from './PaginationItem';

export function Pagination(){
  return(
    <Stack
      direction='row'
      mt='8'
      justify='space-between'
      align='center'
      spacing='6'
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack
        direction='row'
        spacing='2'
      >
        
        <PaginationITem number={1} isCurrent />
        <PaginationITem number={2} />
        <PaginationITem number={3} />
        <PaginationITem number={4} />
        <PaginationITem number={5} />
      </Stack>
    </Stack>
  )
}