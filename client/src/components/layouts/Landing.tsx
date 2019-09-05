import React from 'react'
import { Button, PrimaryButton, Stack, IStackTokens, Text } from 'office-ui-fabric-react';

const gap: IStackTokens = { childrenGap: '1.5rem' };

const Landing = () => (
  <Stack
    verticalAlign="center"
    horizontalAlign="center"
    verticalFill
    grow
    tokens={gap}
  >
    <Text variant="xxLarge">Developer Connector</Text>
    <Text variant="large">
      Create developers portfolio, share, post and get help from other developers
    </Text>    
    <Stack horizontal tokens={gap}>
      <PrimaryButton>Register</PrimaryButton>
      <Button>Login</Button>
    </Stack>
  </Stack>
)

export default Landing