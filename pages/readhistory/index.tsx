import { Avatar, Text } from '@chakra-ui/react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import useFetch from 'use-http';

const ReadHistory = () => {
  const [readHistories, setReadHistories] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const { get, response } = useFetch();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await get("/readhistory/user/");
    if (response.ok) {
      setReadHistories(data.readHistories);
      if (data.readHistories.length > 0) loadHighlights(data.readHistories[0])
    }
  }

  const loadHighlights= async (book) => {
    const data = await get(`/highlights/?bookID=${book.id}`);
    if (response.ok) setHighlights(data.highlights);
  }

  return (
    <>
      <Box position="fixed" width={350} padding="32px 16px">
        { readHistories.map(book => (
            <Flex key={book.id}>
              <Text fontSize="xs">{book.name}</Text>
            </Flex>
          )) 
        }
      </Box>
      <Flex flexDirection="column" width="900px" margin="16px auto">
        { readHistories.length > 0 && <Heading as="h2" size="lg">{ readHistories[0].name }</Heading> }
        
        { readHistories.length > 0 &&
          <Flex margin="16px 0 32px">
          <Avatar size="sm" />
            <Flex alignItems="center" ml="3">
              <Text fontSize="sm">
                { readHistories[0].author }
              </Text>
            </Flex>
          </Flex>
        }
        <Flex flexDirection="column">
          {
            highlights.map(highlight => (
              <Flex key={highlight.id} marginBottom={5} width="900px">
                <Text variant="highlight" color="gray.700" fontSize="sm">{ highlight.highlight }</Text>
              </Flex>
            ))
          }
        </Flex>
      </Flex>
    </>
  );
}

export default ReadHistory

