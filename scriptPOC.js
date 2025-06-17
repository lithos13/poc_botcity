document.addEventListener('DOMContentLoaded', function () {

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Accordion data for DevSecOps section
    const accordionData = [
        {
            title: "Ejecución Paralela de Bots GUI",
            challenge: "Se confirmó que la ejecución de múltiples bots con interfaz gráfica (como SAP) en la misma sesión de usuario genera conflictos y fallos. Es una limitación técnica fundamental de los entornos de escritorio.",
            solution: "La estrategia recomendada es el uso de **múltiples sesiones de usuario** en la misma máquina virtual, gestionadas a través de la herramienta **Session Manager de BotCity**. Esto permite que cada bot se ejecute en un entorno de escritorio aislado y dedicado."
        },
        {
            title: "Runners en Contenedores (Docker)",
            challenge: "La imagen oficial de BotCity presentó un error por una librería faltante (libxtst6) y, posteriormente, un error de conversión de tipos de datos en Java, lo que impidió que el runner se registrara en el orquestrador.",
            solution: "Se resolvió parcialmente creando una imagen Docker personalizada que incluía la librería. El error de Java fue escalado al equipo de BotCity, quienes se encuentran trabajando en una solución definitiva para la imagen oficial."
        },
        {
            title: "Centralización de Registros (Logs)",
            challenge: "Se observó un comportamiento anómalo donde los logs de ejecución parecían ser compartidos entre todos los runners de la misma máquina, dificultando la trazabilidad y el análisis de errores específicos de un bot.",
            solution: "Este hallazgo fue reportado al equipo de BotCity para su análisis y corrección. Se requiere una validación posterior una vez que implementen una solución para asegurar el aislamiento de los registros por runner."
        }
    ];

    function createAccordion(containerId, data) {
        const accordionContainer = document.getElementById(containerId);
        if (!accordionContainer) return;

        accordionContainer.innerHTML = ''; // Clear previous content
        data.forEach((item) => {
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('bg-white', 'rounded-xl', 'shadow-md', 'border', 'border-gray-200', 'overflow-hidden');
            
            accordionItem.innerHTML = `
                <button class="accordion-toggle w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none">
                    <span>${item.title}</span>
                    <span class="transform transition-transform duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                </button>
                <div class="accordion-content hidden p-5 pt-0">
                    <div class="border-t border-gray-200 pt-4">
                        <h4 class="font-semibold text-red-600 mb-2">El Desafío:</h4>
                        <p class="text-gray-600 mb-4">${item.challenge}</p>
                        <h4 class="font-semibold text-green-600 mb-2">La Solución Propuesta:</h4>
                        <p class="text-gray-600">${item.solution}</p>
                    </div>
                </div>
            `;
            accordionContainer.appendChild(accordionItem);
        });

        document.querySelectorAll(`#${containerId} .accordion-toggle`).forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('span.transform');

                content.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        });
    }

    // Chart for Execution Criteria (DevSecOps)
    let criteriaChartInstance = null;
    function createCriteriaChart() {
        const ctx = document.getElementById('criteriaChart');
        if (!ctx) return; // Ensure canvas element exists
        if (criteriaChartInstance) {
            criteriaChartInstance.destroy();
        }
        criteriaChartInstance = new Chart(ctx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: [
                    'Necesita GUI', 
                    'Escalabilidad', 
                    'Aislamiento', 
                    'Eficiencia de Recursos', 
                    'Facilidad de Despliegue',
                    'Dependencias de SO'
                ],
                datasets: [{
                    label: 'Máquina Virtual',
                    data: [10, 5, 4, 3, 6, 9],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                }, {
                    label: 'Entorno Contenerizado',
                    data: [1, 10, 9, 9, 9, 3],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(16, 185, 129, 1)'
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 14
                            },
                            color: '#333'
                        },
                        ticks: {
                            backdropColor: 'rgba(255, 255, 255, 0.75)',
                            stepSize: 2
                        },
                        min: 0,
                        max: 10
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.r !== null) {
                                    label += context.parsed.r;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart for Solutions Identified by Business (Development)
    let solutionsChartInstance = null;
    function createSolutionsChart() {
        const solutionsCtx = document.getElementById('solutionsChart');
        if (!solutionsCtx) return; // Ensure canvas element exists
        if (solutionsChartInstance) {
            solutionsChartInstance.destroy();
        }
        solutionsChartInstance = new Chart(solutionsCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Pozuelo', 'Colcafé', 'Comercial', 'Servicios Nutresa', 'Cárnico'],
                datasets: [{
                    label: 'Automatizaciones Identificadas',
                    data: [15, 6, 4, 3, 16],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: '#333'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#333'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y;
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // Keep track of loaded content for each tab
    const loadedTabs = {
        'devsecops': false,
        'desarrollo': false,
        'cloud': false
    };

    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    async function loadTabContent(tabId) {
        if (loadedTabs[tabId]) {
            // Content already loaded, just ensure charts are correctly displayed if needed
            if (tabId === 'devsecops') {
                createAccordion('accordion-container', accordionData); // Re-create accordion listeners
                createCriteriaChart();
            } else if (tabId === 'desarrollo') {
                createSolutionsChart();
            }
            return;
        }
        try {
            const response = await fetch(`${tabId}.html`);
            const content = await response.text();
            document.getElementById(`${tabId}-content`).innerHTML = content;
            loadedTabs[tabId] = true;

            // Re-initialize charts/accordions after content is loaded
            if (tabId === 'devsecops') {
                createAccordion('accordion-container', accordionData);
                createCriteriaChart();
            } else if (tabId === 'desarrollo') {
                createSolutionsChart();
            }
            // For cloud, no charts or specific JS to re-init
        } catch (error) {
            console.error(`Error loading content for tab ${tabId}:`, error);
            document.getElementById(`${tabId}-content`).innerHTML = `<p class="text-center text-red-500">Error al cargar el contenido de esta sección. Por favor, inténtalo de nuevo más tarde.</p>`;
        }
    }

    function activateTab(tabId) {
        tabButtons.forEach(button => {
            if (button.dataset.tab === tabId) {
                button.classList.add('active');
                button.classList.remove('border-gray-300', 'text-gray-600');
                button.classList.add('border-blue-600', 'text-blue-600');
            } else {
                button.classList.remove('active');
                button.classList.add('border-gray-300', 'text-gray-600');
                button.classList.remove('border-blue-600', 'text-blue-600');
            }
        });

        tabContents.forEach(content => {
            if (content.id === `${tabId}-content`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Load content for the newly activated tab
        loadTabContent(tabId);
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            activateTab(button.dataset.tab);
        });
    });

    // Activate the default tab on load
    activateTab('devsecops');

    const queryInput = document.getElementById('queryInput');
    const queryButton = document.getElementById('queryButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const responseOutput = document.getElementById('responseOutput');
    const responseText = document.getElementById('responseText');

    // Combined content from all three reports for the LLM assistant
    const pocReportContent = `
        **INFORME POC BOTCITY - ÁREA DEVSECOPS**
        El presente documento tiene como objetivo recopilar y exponer las experiencias, hallazgos y desafíos enfrentados durante la realización de la prueba de concepto (PoC) de la herramienta BotCity, llevada a cabo en la máquina virtual proporcionada por la organización. Esta iniciativa tuvo como propósito principal validar la viabilidad técnica de BotCity como plataforma para la automatización de procesos robóticos (RPA), evaluando su integración con los procesos de desarrollo y despliegue continuo, así como su comportamiento en escenarios reales de ejecución.
        A lo largo del documento se describen los distintos proyectos utilizados como casos de prueba, los escenarios evaluados, las configuraciones aplicadas, los resultados obtenidos y las consideraciones identificadas para futuras implementaciones. Además, se incluyen recomendaciones orientadas a fortalecer la adopción de la herramienta y asegurar buenas prácticas en términos de calidad, seguridad y operación.
        El documento también sirve como base de referencia para futuras etapas de implementación, proporcionando insumos técnicos que faciliten la toma de decisiones respecto al uso de BotCity dentro del ecosistema de automatización de la organización.

        **2. Proyecto de calendarios**
        El 5 de mayo se dio inicio a la prueba de concepto en una sesión conjunta con el equipo de BotCity, en la cual se llevó a cabo la configuración necesaria para garantizar el correcto funcionamiento del proceso desde un entorno de CI/CD. Esta configuración incluyó la creación del runner encargado de ejecutar los bots seleccionados para la prueba de concepto, así como su asociación con el orquestador correspondiente. Se cargó el código del proyecto de calendarios - encargado de generar un archivo JSON a partir de un listado de calendarios- en el repositorio creado en Azure DevOps para este propósito. Dicho repositorio incluye todos los archivos necesarios para su integración y ejecución con BotCity. Luego de esto, se configuró el pipeline encargado de la compilación, despliegue y release de este bot. Hubo un inconveniente inicial con el script bot.sh siendo tratado como texto plano, resuelto cambiando el formato a UNIX. La ejecución finalizó exitosamente con la generación del archivo JSON.

        **3. Proyecto con SAP GUI**
        Con el objetivo de validar distintos escenarios, se decidió realizar una prueba con un proyecto que requiriera interfaz gráfica (GUI), ya que el proyecto de calendarios ejecuta sus tareas en segundo plano sin depender de una aplicación visual. Considerando que SAP GUI es una herramienta ampliamente utilizada en los proyectos RPA de la organización, se seleccionó uno de estos proyectos para validar este nuevo escenario. Se cargó el código en una nueva rama dentro del mismo repositorio de la PoC. Fue necesario instalar SAP GUI en la máquina virtual. La ejecución finalizó correctamente.

        **4. Proyecto Colcafé Formularios**
        Este proyecto tiene como objetivo procesar una serie de formularios en formato Excel. Al no requerir interfaz gráfica (GUI), fue ejecutado en un runner de tipo background. El código se cargó en una nueva rama del repositorio y se configuró el pipeline de forma similar. Se confirmó su correcta ejecución.

        **5. Escenarios probados**
        **Validación de asignación y encolamiento de bots:** Se comprobó que el orquestador asigna uno de los bots al runner disponible, mientras que el otro permanece en espera (en cola) hasta que el runner finaliza su tarea y queda disponible. Este comportamiento es el esperado.
        **Validación de ejecución concurrente con múltiples runners:** Se configuraron dos runners (desktop y background) y se asignaron el bot de SAP y el de calendarios. La ejecución simultánea presentó el comportamiento esperado. Se identificó un comportamiento inusual en los registros (logs) de los runners: los logs generados parecen ser compartidos entre todos los runners, independientemente de cuál haya ejecutado el bot. Este incidente fue reportado al equipo de BotCity.
        **Prueba de ejecución paralela de bots con interfaz gráfica (GUI):** Las ejecuciones fallaron debido a conflictos generados por la ejecución paralela de tareas gráficas en la misma sesión de usuario. Se planteó como alternativa el uso de múltiples sesiones de usuario con Session Manager de BotCity.
        **Ejecución de tareas en background mediante contenedores Docker:** Se intentó configurar un contenedor Docker utilizando la imagen oficial python-desktop de BotCity. Durante la ejecución se presentó un error relacionado con la ausencia de la librería de Python libxtst6, resuelto con una imagen personalizada. Sin embargo, al intentar configurar un runner contenerizado basado en esta imagen, surgió un problema de conversión de tipos de datos en Java, impidiendo que se registrara en el orquestador. Este hallazgo fue escalado al equipo de BotCity.

        **6. Criterios para la ejecución de bots: máquina virtual vs. entorno contenerizado**
        **Ejecución en máquina virtual (entorno físico):** Para bots que requieren interfaz gráfica (GUI) como SAP GUI o navegadores web, y proyectos con dependencias o configuraciones específicas del sistema operativo.
        **Ejecución en entornos contenerizados (runners):** Para bots que ejecutan tareas en segundo plano (background) como procesamiento de archivos o consumo de APIs, y cuando se necesite escalabilidad o ejecución concurrente sin interferencia.

        **7. Consideraciones de Seguridad**
        **Gestión segura de credenciales:** Las credenciales (LOGIN, KEY, SERVER) deben ser gestionadas como secretos en Azure DevOps, con acceso restringido.
        **Segregación de ambientes:** Contar con ambientes separados de desarrollo y producción minimiza riesgos.
        **Seguridad en los contenedores:** Basados en imágenes oficiales validadas, con control de versiones y actualizaciones periódicas. Análisis con Trivy y DeepSource.
        **Control de acceso al orquestador:** Principios de mínimo privilegio.
        **Buenas prácticas en el código:** Revisiones de código (Pull Requests) y análisis estático con DeepSource.

        **8. Características técnicas, herramientas y versiones utilizadas**
        **Infraestructura:** EC2 t3.medium, Windows Server, 2 vCPUs, 4 GiB RAM, 50Gb EBS.
        **Herramientas instaladas:** Python 3.9.22, BotCity SDK, BotCity Orchestrator (https://nutresa.botcity.dev), SAP GUI 8.0, Java 24.0.1, Google Chrome.
        **Contenedores:** Docker Engine 26.1.5, Imagen oficial botcity/python-desktop:latest, Imagen personalizada con libxtst6.
        **Repositorios y CI/CD:** Git (Azure DevOps con ramas por repositorio), Azure DevOps Pipelines, DeepSource, Grupo de variables BotCityVariables.
        **Observaciones adicionales:** Se detectaron diferencias entre ambientes locales y la máquina virtual, reafirmando la necesidad de un ambiente de pruebas idéntico a producción. Se propone Session Manager para sesiones paralelas.

        **9. Recomendaciones y consideraciones**
        **Estandarización de herramientas:** Consistencia de versiones entre desarrollo y máquina virtual.
        **Instalación a nivel de sistema:** Herramientas esenciales instaladas globalmente.
        **Control de calidad del código:** Análisis con DeepSource obligatorio, aunque sin pruebas unitarias.
        **Variables de configuración del pipeline:** Crear grupo BotCityVariables con credenciales (LOGIN, KEY, SERVER) de "Entorno de Desarrollo" del orquestador. La variable SERVER es https://nutresa.botcity.dev.
        **Creación de plantilla reutilizable:** Para Azure DevOps pipelines para homogeneizar y facilitar mantenimiento.
        **Ambiente de pruebas alineado con producción:** Vital para validar código y minimizar riesgos de despliegue.
        **Seguimiento al hallazgo de logs compartidos:** Verificar solución de BotCity y aislamiento de registros.
        **Validación de entornos contenerizados:** Realizar pruebas para tareas background una vez solucionado el error en la imagen oficial Docker.
        **Gestión y trazabilidad del código:** Formalizar estrategia de ramificación (Git-flow) para mejorar trazabilidad y revisiones. (feature -> develop -> master)
        **Política de Pull Request (PR):** Definir esquema de revisores (líderes técnicos/desarrolladores experimentados) para aprobación antes de fusiones en ramas críticas.
        **Seguridad en el manejo de credenciales:** Tratar datos sensibles como secretos.
        **Alertamiento y monitoreo:** Establecer mecanismos automáticos de alerta y usar capacidades de BotCity para manejo estructurado de errores.
        **Manejo de concurrencia en bots GUI:** Considerar una segunda máquina virtual a mediano/largo plazo si el volumen de bots GUI es muy alto, además de Session Manager.

        **10. Conclusiones**
        La PoC validó la viabilidad de BotCity, confirmando que los bots GUI deben ejecutarse en VM y los background en contenedores. Se identificaron desafíos con la ejecución simultánea de bots GUI (solución: múltiples sesiones con Session Manager, pendiente de validación) y con imágenes Docker oficiales (en revisión por BotCity). Se establecieron recomendaciones para estandarizar desarrollo, asegurar manejo de credenciales, fortalecer control de versiones, implementar revisiones de código y definir criterios de uso de entornos físicos/virtualizados. La PoC evidenció la necesidad de un ambiente de pruebas equivalente a producción y de mecanismos de monitoreo. La experiencia es un punto de partida sólido para futuros desarrollos de RPA con BotCity.

        **INFORME POC BOTCITY - ÁREA DE DESARROLLO**
        **Conclusiones generales desde el desarrollo:**
        **1. Habilitación y Productividad del Equipo de Desarrollo**
        La plataforma demostró ser un catalizador para la productividad de nuestro equipo. Las librerías nativas y herramientas como el "BotCity Inspector" automatizan la generación de código para la identificación de elementos, lo que se traduce directamente en ciclos de desarrollo más cortos. La documentación y los módulos de capacitación ("BotCity Academy") son de alta calidad y permitieron una rápida asimilación de la tecnología. El punto más estratégico es la alta adaptabilidad de la plataforma. Logramos integrar nuestro framework de desarrollo, actualmente en uso en Grupo Nutresa, lo que garantiza no solo una transición fluida sino también la continuidad de nuestras mejores prácticas y estándares de gobierno en todos los proyectos de automatización.

        **2. Arquitectura de la Plataforma y Capacidades Operativas**
        La arquitectura de la solución es intuitiva y estandarizada, lo que facilita su adopción y reduce la curva de aprendizaje para los desarrolladores. Durante la PoC, se ejecutaron con éxito tanto procesos de escritorio (Desktop) como desatendidos (Background), respetando con total fiabilidad la programación horaria establecida en el orquestador. El proceso de despliegue de las automatizaciones, aunque requiere un paso de compilación, es un procedimiento estandarizado que garantiza consistencia.

        **3. Seguridad y Gobierno de la información**
        La plataforma cumple con requisitos de seguridad críticos. El sistema de encriptación y gestión de credenciales es robusto y de fácil implementación. Permite que las automatizaciones accedan a datos sensibles de forma segura y controlada, sin necesidad de escribirlos directamente en el código fuente, lo que fortalece nuestra postura de seguridad y cumple con las normativas internas.

        **4. Soporte y Relación con el Proveedor**
        El nivel de soporte recibido durante todo el proceso fue un factor decisivo. La atención proactiva a nuestras inquietudes y la eficaz resolución de dudas fueron fundamentales para superar los desafíos iniciales de adaptación. Esta colaboración nos permitió validar que la plataforma cumple con nuestras expectativas para una solución de orquestación centralizada y escalable.

        **Check List de la POC**
        - Integración con Azure DevOps (CI/CD): Si (automatizar pruebas, builds y despliegues; compatibilidad con YAML pipelines y variables de entorno; validación de código estático o pruebas unitarias; logs y trazabilidad).
        - Capacidades de Desarrollo en Python: Si (estructura recomendada; plantillas predefinidas y reutilización; restringir bibliotecas y versiones; soporte para entornos virtuales y gestión de dependencias).
        - Orquestación de Ejecuciones: Si (gestión desde consola, API o programadas; ejecuciones concurrentes y distribución por agente; configurar tiempos máximos o alertas por errores; integrar con sistemas externos).
        - Gestión de Despliegues: Si (manejar múltiples ambientes; gestión de versiones y rollback; controlar despliegues por tenant; automatizar paso entre ambientes con aprobación).
        - Organización y Gobernanza de Bots: Si (agrupar bots; documentar cada bot y su responsable; asignar permisos diferenciados; trazabilidad completa de ejecuciones por usuario).
        - Monitoreo e Insights: Si (dashboards con KPIs; exportar logs o integrarse con Power BI; alertas automáticas; históricos y análisis de tendencias).
        - Seguridad y Manejo de Credenciales: Si (encriptadas y almacenadas de forma segura; integrar con Azure Key Vault; autenticación multifactor y políticas de contraseña; auditar uso de credenciales).
        - Escalabilidad y Confiabilidad: Si (desplegar agentes en distintas ubicaciones; ejecución distribuida o balanceo de carga; recuperación automática ante fallos; ejecutar bots en contenedores o infraestructura en la nube).
        - Soporte Técnico y Resolución de Problemas: Si (canal de soporte definido y accesible; tiempos de respuesta; calidad de respuesta; documentación, FAQs o comunidad activa).

        **5. Adaptación de Desarrollos Existentes para la Plataforma**
        Para integrar un desarrollo existente, es necesaria una sencilla adaptación: archivo principal debe ser "bot.py" con la estructura main; incluir "requirements.txt" con todas las librerías necesarias (incluidas las de BotCity).

        **6. Recursos usados:**
        Python 3.9.22, Java 24.0.1, Windows server, SAP GUI 8.00.

        **7. Listado de soluciones Python identificadas por negocio para incorporarse:**
        Pozuelo: 15
        Colcafe: 6
        Comercial: 4
        Servicios Nutresa: 3
        Cárnico: 16

        **Ventajas:**
        **1. Optimización del Business IT y Gobernanza en Python:** BotCity Python permitirá reducir la dependencia del Business IT, estableciendo directrices claras de gobernanza.
        **2. Impulso a la Estrategia GBS y Reutilización de Componentes:** Facilita la creación de aceleradores, permitiendo la reutilización de componentes funcionales.
        **3. Fortalecimiento de Capacidades Internas y Optimización de Licenciamiento:** Se crea una capacidad interna robusta para desarrollar automatizaciones de complejidad media-baja. Esto libera el ecosistema UiPath para tareas más robustas/complejas (donde su licenciamiento es más adecuado). Las automatizaciones en BotCity Python no incurren en costos de desarrollo y su licenciamiento es considerablemente menor (hasta tres veces más barato que el de UiPath), resultando en un mejor uso del licenciamiento UiPath y ahorro significativo.

        **INFORME POC BOTCITY - ÁREA CLOUD**
        **Resumen del Laboratorio - POC Bot City (EC2 t3.medium - Windows Server)**
        En el marco de la Prueba de Concepto (POC) para Bot City, se implementó y monitoreó una instancia EC2 tipo t3.medium con sistema operativo Windows Server. A continuación, se detallan los hallazgos y características clave:

        **Especificaciones de la instancia EC2 t3.medium**
        VCPU: 2 virtual CPUs
        Memoria RAM: 4 GiB
        Almacenamiento: 50Gb EBS

        **Resultados del monitoreo**
        CPU: Se detectó un alto consumo del 90%, aunque solo durante un periodo corto de tiempo. No se presentaron afectaciones en el rendimiento general.
        Memoria: El uso de memoria osciló entre el 60% y el 90%, manteniéndose dentro de rangos aceptables y sin impacto en el funcionamiento de la POC.
        Disco: Se registró un consumo del 30%, sin afectaciones al rendimiento.

        **Gestión de respaldo**
        Se procedió con la creación de una AMI (Amazon Machine Image) de la instancia para garantizar su reutilización y escalabilidad. También se tomaron snapshots como respaldo de los volúmenes de almacenamiento.

        **Conclusión**
        La POC realizada sobre una instancia t3.medium con Windows Server demostró que este tipo de recurso es adecuado para ejecutar de forma eficiente los procesos asociados al proyecto Bot City en un entorno controlado. A pesar de que se evidenció un alto consumo de CPU (90%) y una utilización de memoria considerable (entre 60% y 90%), el sistema no presentó afectaciones ni fallos durante el monitoreo, lo que indica una buena tolerancia operativa bajo carga moderada. El consumo de disco, limitado al 30%, confirma que el almacenamiento no representa un cuello de botella para este tipo de cargas de trabajo. La creación de la AMI y la toma de snapshots son buenas prácticas que fortalecen la estrategia de respaldo y escalabilidad del entorno, permitiendo una rápida recuperación o replicación. En resumen, la instancia t3.medium para Botcity resulta una opción viable para este tipo de procesos en fase de pruebas o para entornos productivos con cargas similares, aunque se recomienda considerar una instancia con mayores recursos si se proyecta un crecimiento en la demanda o mayor concurrencia en la ejecución de los bots.
    `;

    queryButton.addEventListener('click', async () => {
        const userQuery = queryInput.value.trim();
        if (!userQuery) {
            responseText.textContent = "Por favor, ingresa tu pregunta.";
            responseOutput.classList.remove('hidden');
            return;
        }

        loadingIndicator.classList.remove('hidden');
        responseOutput.classList.add('hidden');
        responseText.textContent = "";

        try {
            let chatHistory = [];
            const prompt = `
                Eres un asistente experto en el informe de Prueba de Concepto (PoC) de BotCity. Tu tarea es responder a las preguntas del usuario BASÁNDOTE EXCLUSIVAMENTE en el siguiente texto consolidado de los informes de DevSecOps, Desarrollo y Cloud. Si la información no está en el texto proporcionado, por favor, indica que no puedes responder la pregunta basándote en el informe.

                Contenido del Informe de PoC de BotCity:
                ${pocReportContent}

                Pregunta del usuario: "${userQuery}"
                `;

            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                responseText.textContent = text;
            } else {
                responseText.textContent = "Lo siento, no pude obtener una respuesta en este momento. Intenta de nuevo más tarde.";
            }
            responseOutput.classList.remove('hidden');

        } catch (error) {
            responseText.textContent = "Ocurrió un error al procesar tu solicitud. Por favor, verifica tu conexión o intenta de nuevo.";
            responseOutput.classList.remove('hidden');
            console.error("Error calling Gemini API:", error);
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    });
});
