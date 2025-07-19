// src/data.js - Stores all subject-wise chapter and topic data

const ALL_SUBJECT_DATA = {
    "Physics": [
        {
            "name": "NCERT", // This is the new 'Book/Module' layer
            "chapters": [
                {
                    "name": "Units and Measurements",
                    "topics": [
                        "SI units (fundamental & derived)",
                        "Least count",
                        "Significant figures",
                        "Errors in measurement",
                        "Dimensions & dimensional analysis"
                    ]
                },
                {
                    "name": "Motion in a Straight Line",
                    "topics": [
                        "Frame of reference",
                        "Position–time & velocity–time graphs",
                        "Speed, velocity, acceleration (uniform & non-uniform)",
                        "Average vs instantaneous velocity",
                        "Equations of motion under uniform acceleration"
                    ]
                },
                {
                    "name": "Motion in a Plane",
                    "topics": [
                        "Scalars vs vectors",
                        "Vector operations (addition, subtraction, dot & cross products)",
                        "Unit vectors, resolution of vectors",
                        "Relative velocity",
                        "Projectile motion",
                        "Uniform circular motion"
                    ]
                },
                {
                    "name": "Laws of Motion",
                    "topics": [
                        "Force, inertia, Newton’s 3 laws",
                        "Momentum, impulse & conservation of momentum",
                        "Equilibrium of forces",
                        "Friction (static, kinetic, rolling)",
                        "Dynamics of circular motion (centripetal force; banked roads)"
                    ]
                },
                {
                    "name": "Work, Energy and Power",
                    "topics": [
                        "Work by constant & variable forces",
                        "Kinetic & potential energy",
                        "Work–energy theorem",
                        "Power",
                        "Mechanical energy conservation",
                        "Conservative vs non-conservative forces",
                        "Motion in vertical circles",
                        "Elastic & inelastic collisions"
                    ]
                },
                {
                    "name": "System of Particles and Rotational Motion",
                    "topics": [
                        "Centre of mass (two-particle & rigid bodies)",
                        "Torque & moment of force",
                        "Moment of inertia, radius of gyration",
                        "Angular momentum & its conservation",
                        "Parallel & perpendicular axis theorems",
                        "Dynamics & equilibrium of rigid bodies"
                    ]
                },
                {
                    "name": "Gravitation",
                    "topics": [
                        "Newton’s universal law",
                        "Acceleration due to gravity (variation)",
                        "Kepler’s laws",
                        "Gravitational potential & energy",
                        "Escape velocity",
                        "Satellite motion (orbital velocity, period, energy)"
                    ]
                },
                {
                    "name": "Mechanical Properties of Solids",
                    "topics": [
                        "Elastic behaviour, stress–strain",
                        "Hooke’s law",
                        "Young’s, shear & bulk moduli"
                    ]
                },
                {
                    "name": "Mechanical Properties of Fluids",
                    "topics": [
                        "Pressure in fluids, buoyancy",
                        "Equation of continuity",
                        "Bernoulli’s theorem",
                        "Viscosity",
                        "Surface tension"
                    ]
                },
                {
                    "name": "Thermal Properties of Matter",
                    "topics": [
                        "Thermal expansion",
                        "Specific heat capacity, calorimetry",
                        "Latent heat",
                        "Heat transfer: conduction, convection, radiation"
                    ]
                },
                {
                    "name": "Thermodynamics",
                    "topics": [
                        "Zeroth, first & second laws",
                        "Internal energy & work",
                        "Processes: isothermal, adiabatic, cyclic",
                        "Carnot cycle & engine"
                    ]
                },
                {
                    "name": "Kinetic Theory",
                    "topics": [
                        "Ideal gas equation",
                        "RMS speed & Maxwell’s distribution",
                        "Degrees of freedom & equipartition theorem"
                    ]
                },
                {
                    "name": "Oscillations",
                    "topics": [
                        "Simple harmonic motion (SHM): definition, equation",
                        "Energy in SHM"
                    ]
                },
                {
                    "name": "Waves",
                    "topics": [
                        "Wave parameters (wavelength, frequency, speed)",
                        "Transverse & longitudinal waves",
                        "Wave propagation & interaction"
                    ]
                },
                {
                    "name": "Electric Charges and Fields",
                    "topics": [
                        "Coulomb’s law & system of charges",
                        "Electric field (lines, flux)",
                        "Gauss’s law & applications",
                        "Electric dipole in field"
                    ]
                },
                {
                    "name": "Electrostatic Potential and Capacitance",
                    "topics": [
                        "Electric potential & potential energy",
                        "Equipotential surfaces",
                        "Capacitors (parallel plate), combinations",
                        "Energy stored in capacitors"
                    ]
                },
                {
                    "name": "Current Electricity",
                    "topics": [
                        "Ohm’s law & resistivity",
                        "Series & parallel circuits",
                        "Kirchhoff’s laws",
                        "Electrical energy and power"
                    ]
                },
                {
                    "name": "Moving Charges and Magnetism",
                    "topics": [
                        "Magnetic force on moving charges & currents",
                        "Biot–Savart law, Ampère’s law"
                    ]
                },
                {
                    "name": "Magnetism and Matter",
                    "topics": [
                        "Magnetic dipole & dipole moment",
                        "Torque on dipole in magnetic field",
                        "Magnetic properties of materials"
                    ]
                },
                {
                    "name": "Electromagnetic Induction",
                    "topics": [
                        "Faraday’s law & Lenz’s law",
                        "Induced emf & current",
                        "Self and mutual inductance"
                    ]
                },
                {
                    "name": "Alternating Current",
                    "topics": [
                        "AC voltage & current in pure resistive, inductive, and capacitive circuits",
                        "LC oscillation",
                        "Resonance in LCR circuits"
                    ]
                },
                {
                    "name": "Electromagnetic Waves",
                    "topics": [
                        "Maxwell’s equations (qualitative)",
                        "Electromagnetic spectrum & properties"
                    ]
                },
                {
                    "name": "Ray Optics and Optical Instruments",
                    "topics": [
                        "Reflection, refraction, lenses, mirrors, magnification",
                        "Human eye (defects & correction)",
                        "Microscopes & telescopes"
                    ]
                },
                {
                    "name": "Wave Optics",
                    "topics": [
                        "Huygens’ principle",
                        "Interference, diffraction",
                        "Young’s double slit experiment"
                    ]
                },
                {
                    "name": "Dual Nature of Radiation and Matter",
                    "topics": [
                        "Photoelectric effect",
                        "de Broglie wavelength",
                        "Matter waves"
                    ]
                },
                {
                    "name": "Atoms",
                    "topics": [
                        "Rutherford & Bohr models",
                        "Energy levels, spectra, transitions"
                    ]
                },
                {
                    "name": "Nuclei",
                    "topics": [
                        "Composition & size of nucleus",
                        "Radioactivity (α, β, γ); decay law",
                        "Nuclear binding energy & fission/fusion"
                    ]
                },
                {
                    "name": "Semiconductor Electronics",
                    "topics": [
                        "Intrinsic & extrinsic semiconductors",
                        "p–n junction diode operation & characteristics",
                        "Diode as rectifier; Zener diode",
                        "Logic Gates"
                    ]
                }
            ]
        },
        // ➕ ADD OTHER PHYSICS BOOKS/MODULES YOU USE (e.g., Coaching Modules) HERE ➕
        // Example for another book:
        /*
        {
            "name": "HC Verma Vol 1",
            "chapters": [
                {"name": "Concepts of Physics - Chapter 1", "topics": ["Topic A", "Topic B"]},
                // ... more HC Verma chapters
            ]
        },
        */
    ],
    "Chemistry": [
        {
            "name": "NCERT", // This is the new 'Book/Module' layer
            "chapters": [
                {
                    "name": "Some Basic Concepts of Chemistry",
                    "topics": [
                        "Matter and its nature",
                        "Laws of chemical combination",
                        "Law of Conservation of Mass",
                        "Law of Definite Proportions",
                        "Law of Multiple Proportions",
                        "Dalton’s atomic theory",
                        "Atoms, molecules, elements, compounds",
                        "Atomic and molecular masses",
                        "Mole concept, molar mass",
                        "Percentage composition",
                        "Empirical and molecular formulas",
                        "Chemical equations and stoichiometry",
                        "Reacting masses",
                        "Concentration terms"
                    ]
                },
                {
                    "name": "Structure of Atom",
                    "topics": [
                        "Subatomic particles: electron, proton, neutron",
                        "Atomic number, mass number, isotopes & isobars",
                        "Bohr’s model: postulates, hydrogen spectrum, limitations",
                        "Dual nature: photoelectric effect, de Broglie relation",
                        "Quantum mechanical model",
                        "Quantum numbers, orbitals (s, p, d), shapes",
                        "Electronic configuration: Aufbau, Pauli exclusion, Hund’s rule"
                    ]
                },
                {
                    "name": "Classification of Elements & Periodicity in Properties",
                    "topics": [
                        "Modern periodic law and periodic table",
                        "Periodic trends:",
                        "Atomic/ionic radii",
                        "Ionization enthalpy",
                        "Electron gain enthalpy",
                        "Electronegativity",
                        "Valency"
                    ]
                },
                {
                    "name": "Chemical Bonding and Molecular Structure",
                    "topics": [
                        "Valence electrons, ionic & covalent bonding",
                        "Lewis structures and resonance",
                        "VSEPR theory: geometry of simple molecules",
                        "Hybridization (sp, sp², sp³, dsp², d²sp³)",
                        "Valence Bond Theory",
                        "Hydrogen bonding"
                    ]
                },
                {
                    "name": "Thermodynamics",
                    "topics": [
                        "System and surroundings, types of systems",
                        "State & path functions, internal energy (ΔU), enthalpy (ΔH)",
                        "First law: P–V work, heat capacity, Hess’s law",
                        "Second law: entropy & spontaneity",
                        "Gibbs free energy",
                        "Third law"
                    ]
                },
                {
                    "name": "Equilibrium",
                    "topics": [
                        "Physical and chemical equilibrium",
                        "Law of mass action & equilibrium constant",
                        "Le Chatelier’s principle",
                        "Ionic equilibrium:",
                        "pH",
                        "Buffer solutions",
                        "Solubility product",
                        "Common-ion effect"
                    ]
                },
                {
                    "name": "Redox Reactions",
                    "topics": [
                        "Oxidation states and balancing redox equations",
                        "Electrochemical cells (galvanic): concepts & applications"
                    ]
                },
                {
                    "name": "Some p-Block Elements",
                    "topics": [
                        "General electronic configuration",
                        "Physical & chemical properties of groups 13–18",
                        "Anomalous behavior of first elements of each group"
                    ]
                },
                {
                    "name": "Organic Chemistry – Some Basic Principles & Techniques",
                    "topics": [
                        "IUPAC nomenclature",
                        "Electronic displacements: inductive & resonance effects",
                        "Isomerism (structural, geometrical)",
                        "Reaction intermediates: carbocations, carbenes",
                        "Hybridization in organic compounds"
                    ]
                },
                {
                    "name": "Hydrocarbons",
                    "topics": [
                        "Alkanes, alkenes, alkynes, and aromatic hydrocarbons",
                        "Conformations and isomerism",
                        "Electrophilic addition & substitution reactions"
                    ]
                },
                {
                    "name": "Solutions",
                    "topics": [
                        "Types of solutions",
                        "Concentration terms",
                        "Colligative properties and their applications"
                    ]
                },
                {
                    "name": "Electrochemistry",
                    "topics": [
                        "Electrochemical cells and electrode potential",
                        "Nernst equation",
                        "Conductance of electrolytic solutions",
                        "Electrolysis"
                    ]
                },
                {
                    "name": "Chemical Kinetics",
                    "topics": [
                        "Rate of reaction",
                        "Order and molecularity",
                        "Rate laws",
                        "Factors affecting rate"
                    ]
                },
                {
                    "name": "The d- and f-Block Elements",
                    "topics": [
                        "Electronic configurations",
                        "Oxidation states, color, magnetic properties, catalytic behavior",
                        "Preparation & properties of K₂Cr₂O₇ and KMnO₄"
                    ]
                },
                {
                    "name": "Coordination Compounds",
                    "topics": [
                        "Werner’s theory",
                        "Ligands, coordination number, chelation",
                        "IUPAC nomenclature",
                        "Isomerism (geometrical, optical)",
                        "VBT & basics of CFT",
                        "Color, magnetism, biological/industrial importance"
                    ]
                },
                {
                    "name": "Haloalkanes and Haloarenes",
                    "topics": [
                        "Nomenclature and structure",
                        "Preparation methods",
                        "Substitution reactions (mechanism)",
                        "Environmental effects"
                    ]
                },
                {
                    "name": "Alcohols, Phenols and Ethers",
                    "topics": [
                        "Preparation, classification, and properties",
                        "Acidity of phenols",
                        "Reactions: dehydration, Reimer–Tiemann, electrophilic substitution"
                    ]
                },
                {
                    "name": "Aldehydes, Ketones and Carboxylic Acids",
                    "topics": [
                        "Nomenclature and structure",
                        "Reactivity of carbonyl group",
                        "Mechanisms: nucleophilic addition, Grignard reagent",
                        "Reactions:",
                        "Oxidation & reduction",
                        "Aldol condensation",
                        "Cannizzaro",
                        "Haloform test"
                    ]
                },
                {
                    "name": "Amines",
                    "topics": [
                        "Structure and classification",
                        "Basicity and tests",
                        "Diazonium salts and their synthetic applications"
                    ]
                },
                {
                    "name": "Biomolecules",
                    "topics": [
                        "Carbohydrates: glucose, fructose, sucrose, lactose",
                        "Proteins: amino acids, peptides, structure, enzymes",
                        "Vitamins: types & functions",
                        "Nucleic acids: DNA/RNA structure & function",
                        "Hormones (introductory only)"
                    ]
                }
            ]
        },
        // ➕ ADD OTHER CHEMISTRY BOOKS/MODULES YOU USE HERE ➕
    ],
    "Biology": [
        {
            "name": "NCERT", // Assuming NCERT is your primary Biology source
            "chapters": [
                {
                    "name": "The Living World",
                    "topics": [
                        // 📚 FILL IN DETAILED TOPICS FOR 'THE LIVING WORLD' HERE 📚
                        // e.g., "What is Living?", "Diversity in the Living World", "Taxonomic Categories"
                    ]
                },
                {
                    "name": "Biological Classification",
                    "topics": [
                        // 📚 FILL IN DETAILED TOPICS FOR 'BIOLOGICAL CLASSIFICATION' HERE 📚
                    ]
                },
                {
                    "name": "Plant Kingdom",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Animal Kingdom",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Morphology of Flowering Plants",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Anatomy of Flowering Plants",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Structural Organisation in Animals",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Cell - The Unit of Life",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Biomolecules",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Cell Cycle and Cell Division",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Photosynthesis in Higher Plants",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Respiration in Plants",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Plant Growth and Development",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Breathing and Exchange of Gases",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Body Fluids and Circulation",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Excretory Products and Their Elimination",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Locomotion and Movement",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Neural Control and Coordination",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Chemical Coordination and Integration",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Sexual Reproduction in Flowering Plants",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Human Reproduction",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Reproductive Health",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Principles of Inheritance and Variation",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Molecular Basis of Inheritance",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Evolution",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Human Health and Disease",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Microbes in Human Welfare",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Biotechnology - Principles and Processes",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Biotechnology and Its Applications",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Organisms and Populations",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Ecosystem",
                    "topics": [] // Fill topics
                },
                {
                    "name": "Biodiversity and Conservation",
                    "topics": [] // Fill topics
                }
            ]
        },
        // ➕ ADD OTHER BIOLOGY BOOKS/MODULES YOU USE HERE ➕
    ]
};