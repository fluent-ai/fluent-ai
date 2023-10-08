# fluentAI

A low code / no code tool for automating interactions with large language models. Check it out over at [fluentAI.io](http://fluentai.io),

![demo video](./demo.gif)

## Stack

We're using a NX Monorepo to encourage breaking code out as libraries. The core application is `apps/fleuntai`

For auth and db were using Supabase.

The app is serverless, calling supabase edge functions for traditional backend tasks. The supabase code is in the apps/supabase project

For testing stuff out your're welcome to use our openAI key, called via supabase edge functions. Each new account gets 20c credit on creation. However as stripe billing is still in the works you can use your own API key via the un app settings.

The UI built using ReactFlow for the workflows and Radix for components.

## Structure

The UI is made up of two main parts. The flow builder uses ReactFlow and controls and dialogs use RadixUI.

To keep things scalable and avoid server costs fluent executes user flows in browser.

The architecture adopts a similar paradigm to Node-Red, where each node manipulates a msg object and passes it along.

ReactFlow provides a non-hierarchical flat array of nodes. To execute the flow, edges are first used to build a relationship graph. Nodes without an upstream connection serve as roots, while downstream nodes form branching trees.

> follow along in [useFlowRunner.tsx](https://github.com/fluent-ai/fluent-ai/blob/development/libs/flow-runner/src/lib/useFlowRunner.tsx)

Nodes are structured as promise wrapped modular code. Special care is taken to catch errors and report them to the UI, because as a kind of IDE, we should report errors to the user and not actually fire an exception.

Once built a promise chain traverses the trees and is considered done when all promises are settled.

Each node is executed with:

- the incoming msg object
- its settings / inputs from the UI
- a shared global scope
- a context for plugins like the remote code runner

## Next steps

### Simplifying the UX for interacting with openAI

As a proof of concept providing functions to an agent works. However manually building the call is overly complex. Ideally functions should be automatically added to the call. A smart paradigm is needed to route the chain without putting the onus on the user to deal with routing.

### Migrating to an event based architecture.

Promise chains are great for simple flows, but limit the flow to synchronous execution. Moving to an event based model would make sense. Instead of an execution graph, maybe downstream nodes subscribe to event emitters on upstream nodes.

### More modular nodes

At the moment, nodes have code in multiple places. The UI code lives in the UI library and the execution code lives within the flowRunner.
Ideally nodes should be centrally described.

## Running locally

Run `nx serve fluentai` for a dev server.
