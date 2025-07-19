// src/data.js - Stores all subject-wise chapter and topic data

const ALL_SUBJECT_DATA = {
    "physics": {
        "Units and Measurements": [
            "SI units (fundamental & derived)",
            "Least count",
            "Significant figures",
            "Errors in measurement",
            "Dimensions & dimensional analysis"
        ],
        "Motion in a Straight Line": [
            "Frame of reference",
            "Position–time & velocity–time graphs",
            "Speed, velocity, acceleration (uniform & non-uniform)",
            "Average vs instantaneous velocity",
            "Equations of motion under uniform acceleration"
        ],
        "Motion in a Plane": [
            "Scalars vs vectors",
            "Vector operations (addition, subtraction, dot & cross products)",
            "Unit vectors, resolution of vectors",
            "Relative velocity",
            "Projectile motion",
            "Uniform circular motion"
        ],
        "Laws of Motion": [
            "Force, inertia, Newton’s 3 laws",
            "Momentum, impulse & conservation of momentum",
            "Equilibrium of forces",
            "Friction (static, kinetic, rolling)",
            "Dynamics of circular motion (centripetal force; banked roads)"
        ],
        "Work, Energy and Power": [
            "Work by constant & variable forces",
            "Kinetic & potential energy",
            "Work–energy theorem",
            "Power",
            "Mechanical energy conservation",
            "Conservative vs non-conservative forces",
            "Motion in vertical circles",
            "Elastic & inelastic collisions"
        ],
        "System of Particles and Rotational Motion": [
            "Centre of mass (two-particle & rigid bodies)",
            "Torque & moment of force",
            "Moment of inertia, radius of gyration",
            "Angular momentum & its conservation",
            "Parallel & perpendicular axis theorems",
            "Dynamics & equilibrium of rigid bodies"
        ],
        "Gravitation": [
            "Newton’s universal law",
            "Acceleration due to gravity (variation)",
            "Kepler’s laws",
            "Gravitational potential & energy",
            "Escape velocity",
            "Satellite motion (orbital velocity, period, energy)"
        ],
        "Mechanical Properties of Solids": [
            "Elastic behaviour, stress–strain",
            "Hooke’s law",
            "Young’s, shear & bulk moduli"
        ],
        "Mechanical Properties of Fluids": [
            "Pressure in fluids, buoyancy",
            "Equation of continuity",
            "Bernoulli’s theorem",
            "Viscosity",
            "Surface tension"
        ],
        "Thermal Properties of Matter": [
            "Thermal expansion",
            "Specific heat capacity, calorimetry",
            "Latent heat",
            "Heat transfer: conduction, convection, radiation"
        ],
        "Thermodynamics": [
            "Zeroth, first & second laws",
            "Internal energy & work",
            "Processes: isothermal, adiabatic, cyclic",
            "Carnot cycle & engine"
        ],
        "Kinetic Theory": [
            "Ideal gas equation",
            "RMS speed & Maxwell’s distribution",
            "Degrees of freedom & equipartition theorem"
        ],
        "Oscillations": [
            "Simple harmonic motion (SHM): definition, equation",
            "Energy in SHM"
        ],
        "Waves": [
            "Wave parameters (wavelength, frequency, speed)",
            "Transverse & longitudinal waves",
            "Wave propagation & interaction"
        ],
        "Electric Charges and Fields": [
            "Coulomb’s law & system of charges",
            "Electric field (lines, flux)",
            "Gauss’s law & applications",
            "Electric dipole in field"
        ],
        "Electrostatic Potential and Capacitance": [
            "Electric potential & potential energy",
            "Equipotential surfaces",
            "Capacitors (parallel plate), combinations",
            "Energy stored in capacitors"
        ],
        "Current Electricity": [
            "Ohm’s law & resistivity",
            "Series & parallel circuits",
            "Kirchhoff’s laws",
            "Electrical energy and power"
        ],
        "Moving Charges and Magnetism": [
            "Magnetic force on moving charges & currents",
            "Biot–Savart law, Ampère’s law"
        ],
        "Magnetism and Matter": [
            "Magnetic dipole & dipole moment",
            "Torque on dipole in magnetic field",
            "Magnetic properties of materials"
        ],
        "Electromagnetic Induction": [
            "Faraday’s law & Lenz’s law",
            "Induced emf & current",
            "Self and mutual inductance"
        ],
        "Alternating Current": [
            "AC voltage & current in pure resistive, inductive, and capacitive circuits",
            "LC oscillation",
            "Resonance in LCR circuits"
        ],
        "Electromagnetic Waves": [
            "Maxwell’s equations (qualitative)",
            "Electromagnetic spectrum & properties"
        ],
        "Ray Optics and Optical Instruments": [
            "Reflection, refraction, lenses, mirrors, magnification",
            "Human eye (defects & correction)",
            "Microscopes & telescopes"
        ],
        "Wave Optics": [
            "Huygens’ principle",
            "Interference, diffraction",
            "Young’s double slit experiment"
        ],
        "Dual Nature of Radiation and Matter": [
            "Photoelectric effect",
            "de Broglie wavelength",
            "Matter waves"
        ],
        "Atoms": [
            "Rutherford & Bohr models",
            "Energy levels, spectra, transitions"
        ],
        "Nuclei": [
            "Composition & size of nucleus",
            "Radioactivity (α, β, γ); decay law",
            "Nuclear binding energy & fission/fusion"
        ],
        "Semiconductor Electronics": [
            "Intrinsic & extrinsic semiconductors",
            "p–n junction diode operation & characteristics",
            "Diode as rectifier; Zener diode",
            "Logic Gates"
        ]
    },
    "chemistry": {
        "Some Basic Concepts of Chemistry": [
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
        ],
        "Structure of Atom": [
            "Subatomic particles: electron, proton, neutron",
            "Atomic number, mass number, isotopes & isobars",
            "Bohr’s model: postulates, hydrogen spectrum, limitations",
            "Dual nature: photoelectric effect, de Broglie relation",
            "Quantum mechanical model",
            "Quantum numbers, orbitals (s, p, d), shapes",
            "Electronic configuration: Aufbau, Pauli exclusion, Hund’s rule"
        ],
        "Classification of Elements & Periodicity in Properties": [
            "Modern periodic law and periodic table",
            "Periodic trends:",
            "Atomic/ionic radii",
            "Ionization enthalpy",
            "Electron gain enthalpy",
            "Electronegativity",
            "Valency"
        ],
        "Chemical Bonding and Molecular Structure": [
            "Valence electrons, ionic & covalent bonding",
            "Lewis structures and resonance",
            "VSEPR theory: geometry of simple molecules",
            "Hybridization (sp, sp², sp³, dsp², d²sp³)",
            "Valence Bond Theory",
            "Hydrogen bonding"
        ],
        "Thermodynamics": [
            "System and surroundings, types of systems",
            "State & path functions, internal energy (ΔU), enthalpy (ΔH)",
            "First law: P–V work, heat capacity, Hess’s law",
            "Second law: entropy & spontaneity",
            "Gibbs free energy",
            "Third law"
        ],
        "Equilibrium": [
            "Physical and chemical equilibrium",
            "Law of mass action & equilibrium constant",
            "Le Chatelier’s principle",
            "Ionic equilibrium:",
            "pH",
            "Buffer solutions",
            "Solubility product",
            "Common-ion effect"
        ],
        "Redox Reactions": [
            "Oxidation states and balancing redox equations",
            "Electrochemical cells (galvanic): concepts & applications"
        ],
        "Some p-Block Elements": [
            "General electronic configuration",
            "Physical & chemical properties of groups 13–18",
            "Anomalous behavior of first elements of each group"
        ],
        "Organic Chemistry – Some Basic Principles & Techniques": [
            "IUPAC nomenclature",
            "Electronic displacements: inductive & resonance effects",
            "Isomerism (structural, geometrical)",
            "Reaction intermediates: carbocations, carbenes",
            "Hybridization in organic compounds"
        ],
        "Hydrocarbons": [
            "Alkanes, alkenes, alkynes, and aromatic hydrocarbons",
            "Conformations and isomerism",
            "Electrophilic addition & substitution reactions"
        ],
        "Solutions": [
            "Types of solutions",
            "Concentration terms",
            "Colligative properties and their applications"
        ],
        "Electrochemistry": [
            "Electrochemical cells and electrode potential",
            "Nernst equation",
            "Conductance of electrolytic solutions",
            "Electrolysis"
        ],
        "Chemical Kinetics": [
            "Rate of reaction",
            "Order and molecularity",
            "Rate laws",
            "Factors affecting rate"
        ],
        "The d- and f-Block Elements": [
            "Electronic configurations",
            "Oxidation states, color, magnetic properties, catalytic behavior",
            "Preparation & properties of K₂Cr₂O₇ and KMnO₄"
        ],
        "Coordination Compounds": [
            "Werner’s theory",
            "Ligands, coordination number, chelation",
            "IUPAC nomenclature",
            "Isomerism (geometrical, optical)",
            "VBT & basics of CFT",
            "Color, magnetism, biological/industrial importance"
        ],
        "Haloalkanes and Haloarenes": [
            "Nomenclature and structure",
            "Preparation methods",
            "Substitution reactions (mechanism)",
            "Environmental effects"
        ],
        "Alcohols, Phenols and Ethers": [
            "Preparation, classification, and properties",
            "Acidity of phenols",
            "Reactions: dehydration, Reimer–Tiemann, electrophilic substitution"
        ],
        "Aldehydes, Ketones and Carboxylic Acids": [
            "Nomenclature and structure",
            "Reactivity of carbonyl group",
            "Mechanisms: nucleophilic addition, Grignard reagent",
            "Reactions:",
            "Oxidation & reduction",
            "Aldol condensation",
            "Cannizzaro",
            "Haloform test"
        ],
        "Amines": [
            "Structure and classification",
            "Basicity and tests",
            "Diazonium salts and their synthetic applications"
        ],
        "Biomolecules": [
            "Carbohydrates: glucose, fructose, sucrose, lactose",
            "Proteins: amino acids, peptides, structure, enzymes",
            "Vitamins: types & functions",
            "Nucleic acids: DNA/RNA structure & function",
            "Hormones (introductory only)"
        ]
    },
    "biology": {
        "The Living World": ["General Topics"],
        "Biological Classification": ["General Topics"],
        "Plant Kingdom": ["General Topics"],
        "Animal Kingdom": ["General Topics"],
        "Morphology of Flowering Plants": ["General Topics"],
        "Anatomy of Flowering Plants": ["General Topics"],
        "Structural Organisation in Animals": ["General Topics"],
        "Cell - The Unit of Life": ["General Topics"],
        "Biomolecules": ["General Topics"],
        "Cell Cycle and Cell Division": ["General Topics"],
        "Photosynthesis in Higher Plants": ["General Topics"],
        "Respiration in Plants": ["General Topics"],
        "Plant Growth and Development": ["General Topics"],
        "Breathing and Exchange of Gases": ["General Topics"],
        "Body Fluids and Circulation": ["General Topics"],
        "Excretory Products and Their Elimination": ["General Topics"],
        "Locomotion and Movement": ["General Topics"],
        "Neural Control and Coordination": ["General Topics"],
        "Chemical Coordination and Integration": ["General Topics"],
        "Sexual Reproduction in Flowering Plants": ["General Topics"],
        "Human Reproduction": ["General Topics"],
        "Reproductive Health": ["General Topics"],
        "Principles of Inheritance and Variation": ["General Topics"],
        "Molecular Basis of Inheritance": ["General Topics"],
        "Evolution": ["General Topics"],
        "Human Health and Disease": ["General Topics"],
        "Microbes in Human Welfare": ["General Topics"],
        "Biotechnology - Principles and Processes": ["General Topics"],
        "Biotechnology and Its Applications": ["General Topics"],
        "Organisms and Populations": ["General Topics"],
        "Ecosystem": ["General Topics"],
        "Biodiversity and Conservation": ["General Topics"]
    }
};

// Exporting the data so it can be accessed by other JavaScript files
// For a simple setup, just declaring it globally might be enough if scripts.html is loaded after data.js
// If using modules (more advanced), you'd use: export { ALL_SUBJECT_DATA };