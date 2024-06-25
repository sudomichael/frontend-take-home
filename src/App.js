import {
  Container,
  TextInput,
  Stack,
  LoadingOverlay,
  Title,
  Flex,
  Button,
  Modal,
  Switch,
} from "@mantine/core";
import { queryNpm } from "./lib/clientApi";
import "./styles.css";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import PackageList from "./components/PackageList";

export default function SearchPage() {
  const [query, setQuery] = useDebouncedState("", 500);
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState([]);
  const [error, setError] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [forceFetchFailure, setForceFetchFailure] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        setLoading(true);
        const { results, error } = await queryNpm(query, forceFetchFailure);
        setQueryResults(results);
        console.log(results);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  return (
    <Container>
      <Flex align="end">
        <Title>Node Package Super Search</Title>
        <Button variant="transparent" size="sm" onClick={open}>
          Options
        </Button>
      </Flex>
      <Stack position="relative">
        <LoadingOverlay visible={loading} />
        <TextInput
          placeholder="Type the name of the package you're looking for"
          error={error}
          label="Search for a node package"
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        <PackageList packages={queryResults} />
      </Stack>
      <Modal opened={opened} onClose={close} title="Super Search Settings">
        <Switch
          checked={forceFetchFailure}
          label="Force API Failure"
          onChange={(event) =>
            setForceFetchFailure(event.currentTarget.checked)
          }
        />
      </Modal>
    </Container>
  );
}
