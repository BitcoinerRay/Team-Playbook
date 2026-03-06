# Sample Project A

Example project using the **web3-product** preset with overrides.

## How to Use

Copy `playbook.yaml` to your project root. The preset/include/exclude declare which modules apply. Run `pnpm playbook sync` to resolve and materialize outputs for Cursor/agents.

## Description

A Web3 product (e.g. wallet or DeFi app) that exposes a REST API. Uses the web3-product preset and adds backend-rest-style for API conventions, launch-copywriting for launches, and create-prd + launch-plan-template for process.

## Playbook

See `playbook.yaml`. Inherits from web3-product and adds:

- **rules**: backend-rest-style
- **skills**: launch-copywriting
- **commands**: create-prd
- **templates**: launch-plan-template
