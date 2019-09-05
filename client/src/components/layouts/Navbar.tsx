import React from 'react'
import { Stack, ActionButton, Text } from 'office-ui-fabric-react';

const Navbar = () => (
  <Stack horizontal horizontalAlign="space-between">
    <ActionButton>
      <Text variant='large'>
        DevCon
      </Text>
    </ActionButton>
    <Stack horizontal>
      <ActionButton>Developers</ActionButton>
      <ActionButton>Posts</ActionButton>
      <ActionButton>Login</ActionButton>
    </Stack>
  </Stack>
)

export default Navbar
