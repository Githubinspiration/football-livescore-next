import NextImage from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { Box, List, ListItem } from '@chakra-ui/layout'
import { Stack, Skeleton } from '@chakra-ui/react'
import { getCompetitions } from '../lib/api-helpers'
import { ErrorState } from './error'

interface CompetitionListProps {
  competitions: Competitions[]
}

export function CompetitionList({ competitions }: CompetitionListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
    initialData: competitions,
  })

  return (
    <Box>
      <List
        background="#121212"
        borderBottomLeftRadius="15px"
        borderBottomRightRadius="15px"
        data-test="competition-list"
        sx={{
          'ul:last-child li': {
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          },
        }}
      >
        {isLoading && data && (
          <Stack spacing={5} padding="1rem">
            {new Array(12).fill(1).map((i: number) => (
              <Skeleton
                key={i}
                height="35px"
                startColor="gray.100"
                endColor="gray.700"
              />
            ))}
          </Stack>
        )}

        {isError && <ErrorState />}

        {competitions.map((competition: Competitions, i: number) => (
          <Link
            key={i}
            passHref
            href={{
              pathname: '/league',
              query: { code: competition.league.name },
            }}
          >
            <ListItem
              display="flex"
              alignItems="center"
              paddingY="0.5rem"
              paddingX="0.5rem"
              color="#FFF"
              fontWeight="500"
              fontSize="0.9rem"
              borderBottom="solid 0.5px"
              borderColor="gray.900"
              sx={{
                '&:hover': {
                  bg: '#1a1a1a',
                  cursor: 'pointer',
                },
              }}
            >
              <Box marginX="10px">
                <NextImage
                  src={competition.league.logo}
                  width={30}
                  height={30}
                  alt={competition.league.name}
                />
              </Box>
              {competition.league.name}
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )
}
