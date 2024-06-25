import {
  Badge,
  Divider,
  Flex,
  Grid,
  Progress,
  Stack,
  Text,
  Anchor,
} from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import { Fragment } from "react";

const PACKAGE_SCORE_CONFIG = {
  maintenance: {
    color: "red",
  },
  popularity: {
    color: "purple",
  },
  quality: {
    color: "green",
  },
};

export default function PackageList(props) {
  const { packages } = props;

  // If there are no packages, safely return
  if (!packages) {
    return;
  }
  return (
    <Stack>
      {packages.map((packageData, index) => {
        const { name, author, description, keywords, date, links } =
          packageData.package;
        const formattedDate = formatDistanceToNow(new Date(date), {
          addSuffix: true,
        });

        return (
          <Fragment key={name}>
            {index !== 0 && <Divider />}
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="0">
                  <Anchor
                    fw={"bold"}
                    href={links.npm}
                    c="black"
                    target="_blank"
                    underline="hover"
                  >
                    {name}
                  </Anchor>
                  <Text c="dimmed" fz="sm">
                    {description}
                  </Text>
                  <Flex wrap="wrap" gap="xs" fz="sm">
                    {(keywords || []).map((keyword) => (
                      <Badge size="sm" key={`${keyword}x${name}`}>
                        {keyword}
                      </Badge>
                    ))}
                  </Flex>
                  {author && (
                    <Flex gap="xs">
                      <Text fw="600" fz="sm">
                        {author.name}
                      </Text>
                      <Text fz="sm">published {formattedDate}</Text>
                    </Flex>
                  )}
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack>
                  {["maintenance", "popularity", "quality"].map(
                    (metricName) => {
                      const { color } = PACKAGE_SCORE_CONFIG[metricName];
                      const score = packageData.score.detail[metricName];
                      return (
                        <Progress.Root size="xl" key={`${metricName}x${name}`}>
                          <Progress.Section value={score * 100} color={color}>
                            <Progress.Label>{metricName}</Progress.Label>
                          </Progress.Section>
                        </Progress.Root>
                      );
                    },
                  )}
                </Stack>
              </Grid.Col>
            </Grid>
          </Fragment>
        );
      })}
    </Stack>
  );
}
