import { useState } from 'react'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { Heading, Flex, Text, Box } from '@chakra-ui/react'
import { getTeams } from '../lib/api-helpers'

export default function Teams() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedItemIndex((prevIndex) => prevIndex - 4)
        break
      case 'ArrowDown':
        setSelectedItemIndex((prevIndex) => prevIndex + 4)
        break
      case 'ArrowLeft':
        setSelectedItemIndex((prevIndex) => prevIndex - 1)
        break
      case 'ArrowRight':
        setSelectedItemIndex((prevIndex) => prevIndex + 1)
        break
      default:
        break
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  })

  const sortedTeams = data?.response.sort(
    (a: { team: { name: string } }, b: { team: { name: string } }) =>
      a.team.name.localeCompare(b.team.name)
  )

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        background="linear-gradient(to right, #1CB5E0, #000046)"
      >
        <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
          <Heading
            color="white"
            fontFamily="inherit"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
          >
            Teams
          </Heading>
        </Flex>
      </Box>

      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        flexWrap={{ base: 'wrap', md: 'wrap' }}
        width="1200px"
        margin="0 auto"
        marginY="2rem"
        gap="1rem"
        outline="none"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {sortedTeams?.map(({ team }: any, index: number) => {
          return (
            <Box
              borderRadius="5px"
              flex="1 0 21%"
              minHeight="150px"
              key={team.id}
              cursor="pointer"
              padding="1rem"
              color="white"
              background="gray.900"
              bg={index === selectedItemIndex ? '#1a1a1a' : 'gray.900'}
              sx={{
                '&:hover': {
                  bg: '#1a1a1a',
                  cursor: 'pointer',
                },
              }}
            >
              <Flex
                direction="column"
                justifyContent="center"
                height="100%"
                cursor="pointer"
              >
                <Image width={55} alt={team.name} height={30} src={team.logo} />
                <Text paddingTop="0.5rem">{team.name}</Text>
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
