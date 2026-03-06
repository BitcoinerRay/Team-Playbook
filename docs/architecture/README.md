# Architecture

## Layer Model

```mermaid
flowchart TB
    subgraph principles [Principles Layer]
        P1[engineering]
        P2[ai-collaboration]
        P3[project-classification]
        P4[product-thinking]
    end

    subgraph standards [Standards Layer]
        S1[naming]
        S2[rule-spec]
        S3[skill-spec]
        S4[template-spec]
    end

    subgraph modules [Modules Layer]
        M1[rules]
        M2[skills]
        M3[commands]
        M4[templates]
    end

    subgraph presets [Presets Layer]
        PR1[web3-product]
        PR2[ai-agent-product]
    end

    principles --> standards
    standards --> modules
    modules --> presets
```

- **Principles**: Decision rules and team consensus. Rarely change.
- **Standards**: Format specs for modules. Define how to write and validate.
- **Modules**: Atomic, reusable units. Each has meta.yaml and content.
- **Presets**: Curated combinations for project types. Consumed via playbook.yaml.
