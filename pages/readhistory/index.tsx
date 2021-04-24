import { Avatar, Text } from '@chakra-ui/react';
import { Flex, Heading, Link } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import useFetch from 'use-http';

const ReadHistory = () => {
  const [readHistories, setReadHistories] = useState([]);
  const [activeReadingHistory, setActiveReadingHistory] = useState<any>();
  const [highlights, setHighlights] = useState([]);
  const { get, response } = useFetch();

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (activeReadingHistory) loadHighlights(activeReadingHistory);
  }, [activeReadingHistory]);

  const loadBooks = async () => {
    const data = await get("/readhistory/user/");
    if (response.ok) {
      setReadHistories(data.readHistories || []);
      if (data.readHistories && data.readHistories.length > 0) {
        setActiveReadingHistory(data.readHistories[0])
      }
    }
  }
  

  const loadHighlights= async (book) => {
    const data = await get(`/highlights/?bookID=${book.id}`);
    if (response.ok) setHighlights(data.highlights);
  }

  const onClickReadingHistory = async (readingHistory) => {
    setActiveReadingHistory(readingHistory)
  }

  return (
    <Flex maxWidth={1300} width="100%" margin="auto">
      <Flex 
        left="30px"
        flexDirection="column"
        padding="32px 16px"
        flex={1}
      >
        <Text color="gray.500" fontWeight="bold" casing="uppercase">Your Reading Histories</Text>
        { readHistories.map(readingHistory => (
            <Flex
              key={readingHistory.id}
              margin="10px 0 18px"
              width={300}
              backgroundColor={activeReadingHistory && readingHistory.id === activeReadingHistory.id ? "gray.50" : "white"}
              onClick={() => onClickReadingHistory(readingHistory)}
            >
              <Link _hover={{ textDecoration: 'none' }}>
                <Text fontWeight="500" fontSize="xs">{readingHistory.name}</Text>
              </Link>
            </Flex>
          )) 
        }
      </Flex>
      <Flex flex={3} flexDirection="column" minWidth={500} margin="30px">
        { activeReadingHistory && <Heading as="h2" size="lg">{ activeReadingHistory.name }</Heading> }
        
        { activeReadingHistory &&
          <Flex margin="16px 0 32px">
          <Avatar size="sm" />
            <Flex alignItems="center" ml="3">
              <Text fontSize="sm">
              By { activeReadingHistory.author }
              </Text>
            </Flex>
          </Flex>
        }
        <Flex flexDirection="column">
          {
            highlights.map(highlight => (
              <Flex key={highlight.id}>
                <Text
                  variant="highlight"
                  color="gray.700"
                  fontSize="sm"
                >
                  { highlight.highlight }
                </Text>
              </Flex>
            ))
          }
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ReadHistory

