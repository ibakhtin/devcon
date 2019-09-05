import React from 'react';
import { Stack, Text, Link, FontWeights } from 'office-ui-fabric-react';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing'

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

export const App: React.FunctionComponent = () => (
  <Stack verticalFill>
    <Navbar />
    <Landing />
  </Stack>
)