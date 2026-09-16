[ 🌐 عربي ](README.ar.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Plantilla Excel de Proyección Financiera de 3 Estados y Modelo de Planificación de Escenarios

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)](README.md) [![Tool Type](https://img.shields.io/badge/Tool-FP&A%20Financial%20Decision%20Support-success.svg)](README.md)

**¿Buscas una plantilla Excel robusta de proyección financiera de 3 estados?** Este **modelo financiero operativo** reutilizable conecta tu pipeline de ventas, los ingresos recurrentes SaaS, la capacidad operativa de entrega, el capital de trabajo neto y la programación de deuda en una **proyección financiera de tres estados** unificada (Estado de Pérdidas y Ganancias, Balance General y Estado de Flujo de Efectivo). Diseñado como una alternativa escalable al complejo software empresarial de FP&A.

> **Versión del navegador:** Calculadora en línea gratuita. Sin registro. Sin instalación.
> **Versión Excel:** Libro de trabajo FP&A de pago, con una **garantía de devolución de dinero de 30 días, sin preguntas**. Construido para pronósticos continuos mensuales, análisis de varianza sin conexión, registros financieros permanentes y pistas de auditoría para inversionistas.
>
> **[🌐 Prueba la Calculadora en Línea Gratuita del Modelo Financiero de 3 Estados]** → [Planificador interactivo de escenarios basado en web](https://hyvoid.github.io/3-statement-financial-model-excel/)
> 
> **[📥 Descarga la Plantilla Excel Reutilizable de Proyección Financiera]** → [Libro de trabajo FP&A sin conexión, desbloqueado y sin macros (.xlsx)](https://theseusworkshop.com/l/bsrbzf?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=3-statement-financial-model)

---

## Puntos de Dolor Comunes de FP&A y Soluciones de Modelización Financiera

Esta plantilla de pronóstico financiero está construida para responder las preguntas exactas que enfrentan los CFOs y operadores cuando el crecimiento operativo debe traducirse en un flujo de caja financieramente sostenible:

* **Punto de Dolor: MRR / ARR SaaS Impredecible** 
  * **Solución (Retención de Ingresos Recurrentes):** Modela automáticamente cómo cambia tu base activa de clientes según tasas de abandono por cohorte, probabilidades de renovación y supuestos de servicios recurrentes.
* **Punto de Dolor: Pipeline de Ventas y Pronóstico de Ingresos Desconectados** 
  * **Solución (Conversión del Pipeline de Proyectos):** Calcula exactamente cómo los leads del CRM se convierten en oportunidades calificadas, órdenes ganadas, valor contractual reservado e ingresos de proyecto reconocidos con tiempos de retraso integrados.
* **Punto de Dolor: Puntos Ciegos en la Planificación de Recursos y Capacidad**
  * **Solución (Gestión de Capacidad de Entrega):** Prueba si tu carga operativa proyectada puede realmente ser manejada por tu número actual de Equivalentes a Tiempo Completo (FTE) y horas estándar de entrega.
* **Punto de Dolor: Proyecciones Inexactas de EBITDA y Rentabilidad**
  * **Solución (Rastreo de Ingresos, COGS y OpEx):** Mapea la actividad operativa subyacente directamente al estado de P&L mensual para ver márgenes brutos y EBITDA verdaderos.
* **Punto de Dolor: Estrangulamientos de Flujo de Caja por Capital de Trabajo**
  * **Solución (Dinámica de Presión del Capital de Trabajo):** Visualiza cómo las Cuentas por Cobrar (días de deudores AR), las Cuentas por Pagar (días de acreedores AP), las rotaciones de inventario y el Trabajo en Progreso (WIP) absorben o liberan efectivo operativo.
* **Punto de Dolor: Gestión Deficiente del Servicio de Deuda y Planificación de Liquidez**
  * **Solución (Estructuración de Liquidez y Deuda):** Integra los retiros de préstamos, los calendarios de amortización de capital, los gastos por intereses y los movimientos netos de efectivo directamente en el Balance General y el Estado de Flujo de Efectivo.

El resultado central no es simplemente otro panel—es una **cadena causal transparente entre una decisión operativa diaria y su consecuencia financiera a largo plazo**.

---

## Tutorial de Inicio Rápido: Cómo Construir tu Pronóstico Financiero

Esta plantilla reemplaza el ciclo de reconstruir constantemente hojas de cálculo desde cero. Sigue este tutorial paso a paso para un flujo de trabajo de pronóstico de **"configurar una vez, actualizar periódicamente"**.

### Paso 1: Define los Supuestos Financieros Clave (Configuración del Modelo)
Abre la pestaña central `Control & Assumptions` para configurar los parámetros que impulsan tus proyecciones financieras:
* Establece la fecha de inicio del pronóstico y el horizonte de proyección (p. ej., continuo de 12 o 24 meses).
* Alterna entre escenarios financieros **Base / Al alza / A la baja**.
* Ingresa el abandono recurrente, los supuestos de renovación de MRR y las tasas de conversión del embudo de ventas.
* Define tu momento de reconocimiento de ingresos (curva de realización de WIP) y las horas estándar de entrega por FTE.
* Ingresa tus días de capital de trabajo (DSO, DPO, DIO) y los términos de interés de la financiación de deuda.

### Paso 2: Ingresa los Impulsores Operativos (Tus Datos Existentes)
Carga los datos operativos crudos que ya rastreas en tu sistema CRM o ERP:
* Recuentos actuales de la base de clientes recurrentes.
* Leads mensuales de proyectos en la parte superior del embudo y tamaños promedio de negocio.
* Número de personal operativo inicial y valores de balance de apertura.
* Facilidades de deuda existentes y supuestos de CapEx.

### Paso 3: Genera las Proyecciones Financieras de 3 Estados (Automatizado)
Observa cómo el modelo traduce automáticamente tus impulsores operativos en salidas financieras estándar mediante el pipeline integrado:
**Pipeline de Ventas → Órdenes Reservadas → Reconocimiento de Ingresos → Capacidad FTE → COGS/OpEx → Dinámica de Capital de Trabajo → Servicio de Deuda → Estados Financieros de 3 Estados**

### Paso 4: Ejecuta el Análisis de Escenarios y Exporta tu Plantilla Excel
Compara los resultados Base, Al alza y A la baja. Busca escaseces de capacidad, trampas de absorción de efectivo por capital de trabajo o incumplimientos de covenedoras de deuda. Ajusta un supuesto y observa el efecto dominó en el flujo de caja al instante.

> **[📥 Descarga la Plantilla Completa del Modelo Excel de 3 Estados](https://theseusworkshop.com/l/bsrbzf?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=3-statement-financial-model)** para construir escenarios personalizados, realizar el rastreo mensual de varianza sin conexión y mantener un archivo de trabajo permanente para tu equipo financiero.

---

## Por Qué la Modelización Operativa Integrada Supera a las Hojas de Cálculo Básicas de P&L

La mayoría de los pronósticos financieros fallan antes de que el equipo de FP&A siquiera termine de generar los tres estados. La causa raíz son los datos previos desconectados.

Un director de ventas pronostica un crecimiento agresivo de la línea superior. Operaciones asume que el equipo puede entregarlo. Finanzas reconoce los ingresos inmediatamente, haciendo que el EBITDA parezca altamente atractivo. Pero la secuencia cronológica real es mucho más estricta:

```text
Lead → Qualified Opportunity → Quoted Project → Won Order → Delivery Workload 
→ WIP / Progress → Recognized Revenue (ASC 606) → Accounts Receivable → Cash Collection

```

Si estas etapas están aisladas en silos, un modelo financiero básico mostrará **ingresos fantasma sin capacidad de entrega adecuada, ganancias en papel sin flujo de caja operativo, y contratos reservados sin cronogramas de ejecución con tiempo preciso**.

### Enfoque FP&A Tradicional vs. Modelización Operativa Integrada

| Desafío de Pronóstico | Enfoque Tradicional de Hoja FP&A | Modelización Operativa Integrada (Esta Herramienta) |
| --- | --- | --- |
| **¿Puede entregarse el crecimiento de ventas?** | Aplica un porcentaje lineal de crecimiento de la línea superior de manera uniforme. | Traduce las métricas del pipeline CRM en carga de trabajo granular y capacidad FTE requerida. |
| **¿Cuándo un proyecto se convierte en ingreso?** | Reconoce el valor total del contrato inmediatamente en el mes de la firma. | Aplica una curva de realización de WIP de múltiples meses para diferir y reconocer ingresos con precisión. |
| **¿Es el crecimiento realmente rentable?** | Se enfoca únicamente en los ingresos de línea superior y márgenes históricos fijos. | Conecta flujos de ingresos distintos directamente a materiales, trabajo directo (COGS) y OpEx. |
| **¿Puede la empresa financiar el crecimiento?** | Usa el EBITDA como proxy del efectivo disponible. | Calcula el arrastre exacto de efectivo de AR, WIP, AP, inventario y obligaciones de deuda principal. |
| **¿Es el pronóstico internamente consistente?** | Depende de ajustes manuales y cuentas de "cuña" para forzar el balance. | Exige automáticamente que el Balance General se reconcilie dinámicamente contra el P&L y el Flujo de Efectivo. |

El objetivo de esta plantilla no es fingir precisión matemática. Es hacer que la **cadena de razonamiento financiero sea visible, estructurada y fácil de desafiar en una sala de juntas**.

---

## Casos de Uso Centrales de FP&A: Cuándo Usar Este Modelo Financiero

Este modelo está diseñado para manejar eventos estratégicos complejos donde las herramientas básicas de presupuestación se quedan cortas:

* **Creación del Plan Operativo Anual (AOP):** Establecer presupuestos arraigados en restricciones de capacidad física en lugar de objetivos de ingresos arbitrarios.
* **Due Diligence de Capital de Riesgo y Recaudación de Fondos:** Proporcionar a los inversionistas una proyección fundamentada y matemáticamente sólida de cómo su capital será absorbido por el capital de trabajo y las necesidades de contratación.
* **Pruebas de Estrés de Flujo de Caja:** Identificar exactamente qué mes un escenario a la baja incumplirá las covenedoras de deuda o requerirá girar contra una línea de crédito revolvente.
* **Planificación de Ventas y Operaciones (S&OP):** Tender el puente entre el pipeline optimista del equipo de ventas y el ancho de banda real del equipo de entrega.

---

## ¿Quién Necesita Esta Plantilla de Pronóstico Financiero? (Roles y Casos de Uso)

Este kit está diseñado para operadores que necesitan integración financiera de grado empresarial sin la sobrecarga de implementar Anaplan, Adaptive Planning o Planful.

* **Fundadores de Startups y CEOs (Modelo Financiero de Recaudación):** Presentan a inversionistas una proyección fundamentada y consciente de la capacidad del uso de fondos, en lugar de gráficos de palo de hockey fantasiosos.
* **CFOs Fraccionados y Analistas de FP&A (Plantilla Excel de Planificación de Escenarios):** Evitan el software empresarial torpe para proporcionar a los clientes entregables de pronóstico `.xlsx` limpios, ágiles y profesionales.
* **Directores de RevOps y Ventas (Calculadora de Pipeline a Ingresos):** Tender el puente de la desconexión entre los datos de reservas del CRM Salesforce y el momento real de los ingresos contables realizados.
* **Dueños de Agencias y Servicios Profesionales (Software de Planificación de Capacidad):** Alinear horas facturables, backlogs de proyectos y Trabajo en Progreso (WIP) para evitar la sobrecontratación o el agotamiento de tu equipo de entrega.

Es particularmente relevante cuando tu modelo de negocio combina:

* Contratos recurrentes de SaaS, cumplimiento o servicios de mantenimiento.
* Trabajo de proyectos de ingeniería, instalación o agencias.
* Pipelines de leads con rastreo de conversión medible etapa por etapa.
* Equipos de entrega cuya capacidad física restringe directamente el crecimiento de ingresos.
* Retrasos de capital de trabajo (términos de crédito al cliente vs. pagos a proveedores).

*(Nota: **No** está diseñado para reemplazar tu libro mayor general (p. ej., QuickBooks, Xero) ni tus procesos de reporte fiscal estatutario).*

---

## Acerca de la Arquitectura

Construyo rastreadores ligeros de FP&A y herramientas de modelización de apoyo a la decisión para situaciones donde hay demasiadas piezas en movimiento para mantenerlas en la cabeza de una sola persona, pero no la suficiente complejidad como para justificar una implementación de software empresarial de seis cifras.

La pregunta central detrás de esta arquitectura es simple: **¿Qué información debe existir en un solo lugar para tomar la próxima decisión operativa con confianza?**

Este modelo obliga al pronóstico financiero a comenzar con las decisiones operativas que realmente crean los estados financieros, resultando en un marco de pronóstico reutilizable en lugar de una hoja de reporte frágil y de un solo uso.

---

## Detalles Técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

### Arquitectura del Libro de Trabajo

El libro de trabajo está estructurado como un modelo direccional de lo operativo a lo financiero.

La arquitectura separa **supuestos, impulsores operativos, cálculos, integración financiera y salidas de gestión** en lugar de mezclar todos los cálculos en una sola hoja de reporte.

```text
                    CONTROL & ASSUMPTIONS
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   RECURRING REVENUE   PROJECT PIPELINE   DEBT SCHEDULE
          │                 │                 │
          │                 ▼                 │
          │          CAPACITY PLANNING       │
          │                 │                 │
          └────────────┬────┴─────────────────┘
                       ▼
                REVENUE SCHEDULE
                       │
                       ▼
                OPERATING MODEL
                       │
                       ├───────────────┐
                       ▼               ▼
                WORKING CAPITAL   DEBT / INTEREST
                       │               │
                       └───────┬───────┘
                               ▼
                       THREE STATEMENTS
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        SCENARIO / SENSITIVITY       MANAGEMENT DASHBOARD
```

### Mapa de Hojas

| Hoja                  | Rol                                        | Salida Principal                                                                           |
| ---------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Control_Assumptions`  | Capa central de control y supuestos        | Supuestos de escenario, conversión, tiempo, capacidad, capital de trabajo, impuestos, costos y deuda |
| `Recurring_Revenue`    | Motor de servicios recurrentes             | Base de contratos activos e ingresos recurrentes reconocidos                              |
| `Project_Pipeline`     | Motor de embudo de ventas y realización de proyectos | Oportunidades, órdenes, valor contractual e ingresos WIP                         |
| `Capacity_Planning`    | Motor de carga de trabajo a FTE            | FTE requerido y brecha/superávit de capacidad                                             |
| `Revenue_Schedule`     | Capa de consolidación de ingresos          | Ingresos mensuales estandarizados a través de 14 flujos de negocio                       |
| `Operating_Model`      | Capa de costos y beneficio operativo       | COGS, trabajo directo, Opex, margen bruto, EBITDA                                         |
| `Working_Capital`      | Impulsor operativo del balance             | AR, inventario, WIP, AP, NWC y ΔNWC                                                       |
| `Debt_Schedule`        | Motor de financiamiento                    | Retiros, amortización, deuda de cierre e intereses                                        |
| `Three_Statements`     | Capa de integración financiera             | P&L, Balance General, Flujo de Efectivo y verificación del balance                        |
| `Scenario_Sensitivity` | Comparación de escenarios                  | Transmisión Base / Al alza / A la baja                                                    |
| `Management_Dashboard` | Presentación de gestión                    | EBITDA, capacidad, mezcla de ingresos, liquidez e indicadores operativos                  |

### Diseño Central de Supuestos

El modelo sigue un principio de **cero codificación fija, mantenimiento de punto único**.

La capa principal de supuestos contiene ocho grupos de parámetros principales:

| Grupo              | Variables Principales                                         |
| ------------------ | ------------------------------------------------------------ |
| Control del Modelo | Escenario activo, fecha de inicio del pronóstico, períodos de pronóstico |
| Servicios Recurrentes | Abandono, renovación, ARPU                                   |
| Embudo de Proyectos | Conversión de lead-a-oportunidad y cotización-a-orden         |
| Tiempo de Ventas   | Retraso de cotización-a-orden y valor promedio de proyecto    |
| Realización de WIP | Curva de realización de ingresos de proyecto M0–M3           |
| Capacidad          | Horas de esfuerzo estándar, horas productivas mensuales, utilización |
| Capital de Trabajo | Días de deudores, acreedores e inventario                     |
| Financiamiento y Costos | Términos de deuda, tasa impositiva, ratio de materiales, salario, Opex fijo |

El escenario activo se selecciona mediante `Active_Scenario_Index`:

```text
1 = Base
2 = Upside
3 = Downside
```

Cambiar el escenario activo cambia los supuestos de tasas de conversión relevantes usados aguas abajo.

### Inventario Global de Entradas

Las principales entradas manuales o de inicialización son:

| ID      | Entrada                      | Fuente                  |
| ------- | ---------------------------- | ----------------------- |
| `IN-01` | `Active_Scenario_Index`      | Gerencia / analista     |
| `IN-02` | `Funnel_Conversion_Rates`    | RevOps                  |
| `IN-03` | `Quote_To_Order_Lag_Days`    | RevOps                  |
| `IN-04` | `WIP_Realization_Schedule`   | Entrega de proyectos    |
| `IN-05` | `Role_Effort_Hour_Per_Order` | Operaciones             |
| `IN-06` | `Working_Capital_Days_Input` | Finanzas                |
| `IN-07` | `Debt_Contract_Parameters`   | Finanzas                |
| `IN-08` | `Intercompany_Loan_WriteOff` | Finanzas                |
| `IN-09` | `Historical_Customer_Base`   | Equipo de servicios recurrentes |
| `IN-10` | `Pipeline_Raw_Leads_Volume`  | Marketing / Ventas      |
| `IN-11` | `Average_Quote_Value`        | RevOps                  |
| `IN-12` | `Base_Headcount_Opening`     | RR. HH.                 |
| `IN-13` | `Opening_Balance_Sheet_Data` | Finanzas                |

### Inventario Global de Salidas

Las principales salidas calculadas forman la cadena financiera aguas abajo:

| ID       | Salida                       | Uso para la Decisión                                  |
| -------- | ---------------------------- | --------------------------------------------- |
| `OUT-01` | `Recurring_Net_Active_Base`  | Trayectoria de la base de clientes recurrentes        |
| `OUT-02` | `Recurring_Recognized_Rev`   | Ingresos recurrentes del P&L                         |
| `OUT-03` | `Project_Derived_Orders`     | Nueva demanda de proyectos y valor contractual        |
| `OUT-04` | `WIP_Released_Revenue`       | Momento de los ingresos de proyecto                    |
| `OUT-05` | `Required_Operational_FTE`   | Requerimiento de personal                             |
| `OUT-06` | `Capacity_Gap_Surplus`       | Advertencia de contratación / subcontratación / capacidad de ventas |
| `OUT-07` | `Total_Standardized_Revenue` | Impulsor unificado de ingresos                        |
| `OUT-08` | `COGS_And_Direct_Labor`      | Cálculo de beneficio bruto                            |
| `OUT-09` | `Operating_Expenses_Opex`    | Carga de costos operativos                            |
| `OUT-10` | `Ending_AR_Debtors`          | Requerimiento de financiamiento de cuentas por cobrar |
| `OUT-11` | `Ending_WIP_Balance`         | Capital de proyecto inmovilizado en WIP               |
| `OUT-12` | `Delta_Working_Capital`      | Ajuste de flujo de caja                               |
| `OUT-13` | `Debt_Principal_Repayment`   | Salida de efectivo de financiamiento                  |
| `OUT-14` | `Debt_Interest_Expense`      | Costo de financiamiento                               |
| `OUT-15` | `P&L_EBITDA`                 | Rentabilidad operativa                                |
| `OUT-16` | `CFS_Net_Cash_Movement`      | Movimiento mensual de liquidez                        |
| `OUT-17` | `Balance_Sheet_Check_Diff`   | Control de integridad del modelo                      |

### Principio de Dependencia de Datos

La dirección de dependencia prevista es:

```text
Manual Assumptions
        ↓
Operating Drivers
        ↓
Dynamic Calculation Engines
        ↓
Unified Revenue / Cost Layers
        ↓
Working Capital + Financing
        ↓
Three Statements
        ↓
Scenario Analysis + Management Outputs
```

Las hojas aguas abajo deberían consumir las salidas calculadas en lugar de recrear la misma lógica de negocio de forma independiente.

Esto evita que se desarrollen múltiples versiones de la lógica de ingresos, costos o flujo de caja dentro del mismo libro de trabajo.

### Tres Trampas Que Atrapan Incluso a Analistas Financieros Experimentados

El modelo está diseñado alrededor de tres modos de falla que frecuentemente sobreviven a la revisión ordinaria de hojas de cálculo: **distorsión de tiempo, crecimiento ciego a la capacidad y pronóstico de ganancias sin efectivo**.

#### Trampa 1 — Tratar el Valor del Contrato como Ingreso Actual

Se toma la decisión de aumentar el pronóstico de ingresos a corto plazo porque el pipeline de proyectos contiene una gran cantidad de trabajo cotizado o recién ganado.

El supuesto no notado es que el valor del contrato se convierte en ingresos del P&L inmediatamente.

Eso cambia la recomendación: la empresa parece capaz de soportar una mayor rentabilidad a corto plazo y puede parecer lista para aumentar el gasto fijo.

El razonamiento es incorrecto porque el trabajo de proyecto se entrega a través de múltiples períodos. Una orden firmada no es necesariamente el mismo evento económico que un ingreso reconocido.

El enfoque corregido separa las **órdenes reservadas** de los **ingresos reconocidos**, luego libera el valor del proyecto según el cronograma de entrega esperado.

|                              | Pronóstico Débil | Pronóstico Corregido |
| ---------------------------- | ------------: | -----------------: |
| Nuevas órdenes de proyecto    |      $500,000 |           $500,000 |
| Ingresos del Mes-0            |      $500,000 |           $100,000 |
| Ingresos de períodos posteriores |            $0 |           $400,000 |
| Implicación inmediata de EBITDA |    Sobreestimado |    Ajustado en tiempo |

La decisión por lo tanto cambia de **"aumentar el gasto porque los ingresos se aceleran"** a **"confirmar si el cronograma de entrega actual soporta el gasto planificado."**

<details>
<summary>Lógica de fórmula</summary>

```excel
=Orders_t0*w0
 +Orders_t1*w1
 +Orders_t2*w2
 +Orders_t3*w3
```

Los pesos de realización se controlan centralmente a través del cronograma de realización de WIP.

</details>

---

#### Trampa 2 — Pronosticar el Crecimiento Sin Probar la Capacidad de Entrega

Se toma la decisión de aceptar un pipeline de proyectos más fuerte porque el pronóstico financiero muestra ingresos incrementales atractivos.

El número no notado es la capacidad de entrega requerida.

Un modelo de conversión de pipeline puede generar órdenes adicionales sin responder automáticamente si el equipo existente puede ejecutarlas.

La recomendación resultante puede ser perseguir todas las oportunidades disponibles.

Eso es un razonamiento incompleto.

El modelo corregido convierte las oportunidades y órdenes proyectadas en carga de trabajo estándar, luego traduce la carga de trabajo en FTE requerido. La capacidad disponible se compara contra ese requerimiento.

|                         |    Pronóstico Débil |              Pronóstico Consciente de Capacidad |
| ----------------------- | ---------------: | -----------------------------------: |
| Oportunidades calificadas |              420 |                                  420 |
| Órdenes ganadas           |              140 |                                  140 |
| FTE requerido             |      No modelado |                     Derivado de la carga |
| Escasez de capacidad      |        Invisible |                             Explícita |
| Acción de gerencia        | Aceptar más trabajo | Contratar, subcontratar o limitar la admisión |

Una brecha de capacidad negativa no es meramente un problema de RR. HH. Puede convertirse en un **problema de retraso de entrega, calidad, contractual y de margen**.

La decisión corregida por lo tanto se basa en **potencial de ingresos sujeto a la capacidad de ejecución**, en lugar del potencial de ingresos solo.

<details>
<summary>Lógica de fórmula</summary>

```excel
Required_FTE =
Required_Work_Hours /
(Monthly_Standard_Hours * Productive_Utilization)
```

Para los roles operativos:

```excel
Qualifier_FTE =
Qualified_Opps * Qualifier_Effort /
Available_Hours_Per_FTE

Identifier_FTE =
Won_Orders * Identifier_Effort /
Available_Hours_Per_FTE
```

</details>

---

#### Trampa 3 — Tratar el EBITDA como Efectivo Disponible

Se toma la decisión de financiar la expansión porque el EBITDA proyectado permanece positivo.

El supuesto no notado es que la rentabilidad contable y la disponibilidad de efectivo se mueven juntas.

No lo hacen.

Un negocio de proyectos en crecimiento puede generar un EBITDA positivo mientras el efectivo es absorbido por cuentas por cobrar, inventario, WIP y amortización de deuda.

La recomendación débil es por lo tanto **"el negocio es rentable, así que la expansión es asequible."**

El enfoque corregido modela explícitamente el capital de trabajo operativo y los movimientos de financiamiento antes de determinar el efectivo final.

| Impulsor de Efectivo    | Efecto                        |
| --------------------- | ----------------------------- |
| EBITDA                | Punto de partida del efectivo operativo |
| Aumento en AR         | Efectivo absorbido            |
| Aumento en Inventario | Efectivo absorbido            |
| Aumento en WIP        | Efectivo absorbido            |
| Aumento en AP         | Efectivo liberado             |
| Nueva Deuda           | Efectivo proporcionado        |
| Amortización de Capital | Efectivo consumido          |
| Intereses             | Efectivo consumido            |

Un negocio por lo tanto puede reportar un margen operativo saludable mientras experimenta un estrangulamiento material de liquidez.

La decisión corregida se convierte en **"la expansión es económicamente rentable, pero su requerimiento de financiamiento debe cubrirse antes de aceptar la carga de trabajo adicional."**

<details>
<summary>Lógica de fórmula</summary>

```excel
Delta_NWC = NWC_t - NWC_(t-1)

Net_Cash_Movement =
Net_Income
+ D&A
- Delta_NWC
- Capex
+ New_Debt
- Principal_Repayment
```

La verificación del balance luego prueba si los estados financieros resultantes permanecen internamente consistentes.

</details>

### Escenario de Ejemplo

Considera un negocio de servicios liderado por proyectos que entra en un período de crecimiento de 12 meses.

El pronóstico operativo contiene **1,200 leads nuevos** a través del pipeline de proyectos. Asume que el escenario activo produce una conversión de lead-a-oportunidad del 35% y una conversión de cotización-a-orden del 25%. Esto implica aproximadamente **420 oportunidades calificadas** y aproximadamente **105 órdenes ganadas** antes de considerar la distribución detallada del tiempo.

Asume que el valor promedio del proyecto es **$20,000**.

La entrada de órdenes resultante es aproximadamente:

```text
105 orders × $20,000
= $2,100,000 contracted value
```

Un pronóstico simplista podría reconocer los $2.1 millones completos como ingresos cuando se firman los contratos.

El modelo en cambio aplica la curva de realización del proyecto:

```text
M0 = 20%
M1 = 40%
M2 = 30%
M3 = 10%
```

Para un grupo de órdenes de $2.1 millones, la liberación de ingresos correspondiente es:

| Período    | Reconocimiento |        Ingresos |
| --------- | ----------: | -------------: |
| M0        |         20% |       $420,000 |
| M1        |         40% |       $840,000 |
| M2        |         30% |       $630,000 |
| M3        |         10% |       $210,000 |
| **Total** |    **100%** | **$2,100,000** |

La interpretación comercial cambia materialmente.

La empresa tiene **$2.1 millones de valor contractual de proyectos**, pero solo $420,000 se reconocen en el mes inicial bajo este perfil de realización.

El modelo de capacidad luego prueba si las 105 órdenes pueden realmente entregarse. La carga de trabajo requerida se calcula usando los supuestos de esfuerzo estándar para los roles operativos relevantes y se compara con la capacidad productiva mensual.

Finalmente, el modelo de capital de trabajo hace una pregunta diferente: **¿cuánto efectivo debe financiarse mientras esos ingresos se entregan y cobran?**

La recomendación por lo tanto no es simplemente perseguir el grupo de oportunidades de $2.1 millones. La gerencia debe evaluar **el momento de los ingresos, la capacidad de entrega, la absorción de capital de trabajo y los requerimientos de servicio de deuda en conjunto**.

Ese es el propósito central del modelo: convertir un pronóstico de ventas en una decisión operativa financieramente restringida.

### Referencia de Fórmulas

<details>
<summary>Motor de Ingresos Recurrentes</summary>

**Abandono mensual**

```excel
=LET(
    Opening_Base,C10:C16,
    Annual_Churn,Control_Assumptions!$C$11:$C$17,
    ROUND(Opening_Base*(Annual_Churn/12),0)
)
```

Propósito: convierte los supuestos de abandono anual en desgaste contractual mensual a través de la base de servicios recurrentes.

**Ingresos recurrentes reconocidos**

```excel
=LET(
    Active_Contracts,D26:D32,
    Annual_ARPU,Control_Assumptions!$E$11:$E$17,
    ROUND(Active_Contracts*(Annual_ARPU/12),2)
)
```

Propósito: convierte los contratos recurrentes activos en ingresos mensuales reconocidos.

</details>

<details>
<summary>Motor del Pipeline de Proyectos</summary>

**Conversión de oportunidades guiada por escenario**

```excel
=LET(
    Current_Scenario,Control_Assumptions!$C$4,
    Conv_Matrix,Control_Assumptions!$C$21:$E$27,
    Active_Rate,
        CHOOSE(
            Current_Scenario,
            INDEX(Conv_Matrix,,1),
            INDEX(Conv_Matrix,,2),
            INDEX(Conv_Matrix,,3)
        ),
    ROUND(C10:Z16*Active_Rate,0)
)
```

Propósito: cambia el escenario de tasa de conversión activo sin reconstruir el modelo de pipeline.

**Realización de ingresos de proyecto**

```excel
=LET(
    w0,Control_Assumptions!$C$41,
    w1,Control_Assumptions!$D$41,
    w2,Control_Assumptions!$E$41,
    w3,Control_Assumptions!$F$41,
    Orders_t0,C40:C46,
    Orders_t1,IFERROR(OFFSET(C40:C46,0,-1),0),
    Orders_t2,IFERROR(OFFSET(C40:C46,0,-2),0),
    Orders_t3,IFERROR(OFFSET(C40:C46,0,-3),0),
    ROUND(
        Orders_t0*w0+
        Orders_t1*w1+
        Orders_t2*w2+
        Orders_t3*w3,
        2
    )
)
```

Propósito: convierte la entrada de órdenes de proyecto en ingresos reconocidos específicos del período.

</details>

<details>
<summary>Planificación de Capacidad</summary>

**FTE requerido**

```excel
=LET(
    Opps_Total,
        BYCOL(Project_Pipeline!C20:Z26,LAMBDA(col,SUM(col))),
    Orders_Total,
        BYCOL(Project_Pipeline!C30:Z36,LAMBDA(col,SUM(col))),
    Q_Effort,Control_Assumptions!$C$45,
    I_Effort,Control_Assumptions!$D$46,
    Std_Hours,Control_Assumptions!$C$47,
    Util_Rate,Control_Assumptions!$C$48,
    Available_Hours_Per_FTE,
        Std_Hours*Util_Rate,
    Q_FTE_Vector,
        ROUND(
            (Opps_Total*Q_Effort)/
            Available_Hours_Per_FTE,
            1
        ),
    I_FTE_Vector,
        ROUND(
            (Orders_Total*I_Effort)/
            Available_Hours_Per_FTE,
            1
        ),
    VSTACK(Q_FTE_Vector,I_FTE_Vector)
)
```

Propósito: deriva los requerimientos de personal de la carga de trabajo en lugar de aplicar un supuesto fijo de número de empleados.

**Brecha de capacidad**

```excel
=LET(
    Total_Required,
        C14#+OFFSET(C14#,1,0),
    Available,C18:Z18,
    ROUND(Available-Total_Required,1)
)
```

Los valores negativos indican capacidad disponible insuficiente.

</details>

<details>
<summary>Modelo de Ingresos y Operaciones</summary>

**Agregación de ingresos**

```excel
=LET(
    Recurring_Block,Recurring_Revenue!D35:Z41,
    Project_Block,Project_Pipeline!C50:Z56,
    VSTACK(Recurring_Block,Project_Block)
)
```

Propósito: crea una matriz de ingresos estandarizada a partir de actividades recurrentes y de proyectos.

**Ingresos mensuales totales**

```excel
=BYCOL(C10#,LAMBDA(col,SUM(col)))
```

Propósito: produce la serie de ingresos mensuales de toda la empresa consumida por el modelo operativo y financiero.

**EBITDA**

```excel
=LET(
    Rev,Revenue_Schedule!$C$24#,
    COGS,BYCOL(C12#,LAMBDA(col,SUM(col))),
    Opex,BYCOL(C20:Z21,LAMBDA(col,SUM(col))),
    Rev-COGS-Opex
)
```

Propósito: calcula el EBITDA operativo a partir de los ingresos reconocidos, los costos directos y los gastos operativos.

</details>

<details>
<summary>Capital de Trabajo y Flujo de Efectivo</summary>

**AR, inventario y AP**

```excel
=LET(
    Rev,Revenue_Schedule!$C$24#,
    Mat_Cost,Operating_Model!$C$12#,
    DSO,Control_Assumptions!$C$50,
    DPO,Control_Assumptions!$C$51,
    DIO,Control_Assumptions!$C$52,
    AR_Vector,ROUND(Rev*(DSO/30),2),
    AP_Vector,ROUND(Mat_Cost*(DPO/30),2),
    Inv_Vector,ROUND(Mat_Cost*(DIO/30),2),
    VSTACK(AR_Vector,Inv_Vector,AP_Vector)
)
```

Propósito: traduce los supuestos de crédito comercial e inventario en requerimientos de financiamiento del balance.

**Saldo de WIP**

```excel
=LET(
    Cum_Orders,
        SCAN(
            0,
            Project_Pipeline!$C$40#,
            LAMBDA(acc,val,acc+val)
        ),
    Cum_Rev,
        SCAN(
            0,
            Project_Pipeline!$C$50#,
            LAMBDA(acc,val,acc+val)
        ),
    ROUND(Cum_Orders-Cum_Rev,2)
)
```

Propósito: identifica el valor contractual de proyecto que aún no ha sido liberado a través de ingresos de proyecto reconocidos.

**Movimiento de NWC**

```excel
=LET(
    AR,C10#,
    Inv,C11#,
    AP,C12#,
    WIP,C14#,
    NWC,AR+Inv+WIP-AP,
    NWC_Prev,HSTACK(0,DROP(NWC,0,-1)),
    ROUND(NWC-NWC_Prev,2)
)
```

Propósito: suministra el ajuste de flujo de caja del capital de trabajo.

</details>

<details>
<summary>Programación de Deuda e Integración de Tres Estados</summary>

**Amortización de capital de deuda**

```excel
=LET(
    Tenors,Control_Assumptions!$E$56:$E$58,
    Openings,Control_Assumptions!$C$56:$C$58,
    Monthly_Amort,ROUND(Openings/Tenors,2),
    MAKEARRAY(
        ROWS(Tenors),
        Control_Assumptions!$C$6,
        LAMBDA(r,c,INDEX(Monthly_Amort,r,1))
    )
)
```

**Gasto por intereses**

```excel
=LET(
    Rates,Control_Assumptions!$D$56:$D$58,
    Avg_Debt,(C10:Z12+C26:Z28)/2,
    ROUND(Avg_Debt*(Rates/12),2)
)
```

Los movimientos de deuda resultantes alimentan el flujo de caja de financiamiento, mientras el gasto por intereses alimenta el P&L.

Los tres estados luego se reconcilian mediante la verificación del balance:

```text
Assets - Liabilities - Equity = 0.00
```

</details>

### Reglas de Validación

La arquitectura de origen define la validación como parte del modelo en lugar de un paso opcional de presentación. La verificación cruzada documentada no encontró supuestos codificados de impuestos, capital de trabajo o tasas de interés en las fórmulas centrales revisadas; los grupos de parámetros se referencian centralmente. 

| Campo / Control         | Regla de Validación                                           | Comportamiento de Error                                                       |
| ----------------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| `Active_Scenario_Index` | Debe resolverse a Base, Al alza o A la baja                | Un escenario inválido impide una selección confiable de escenario                |
| `Forecast_Start_Date`   | Debe ser una fecha Excel válida                            | Una fecha inválida rompe la línea de tiempo del pronóstico                            |
| `Forecast_Periods`      | Debe ser un horizonte de pronóstico positivo               | Un conteo de períodos inválido impide el ancho correcto de arreglos dinámicos            |
| Tasas de Abandono / Renovación | Deben ser supuestos porcentuales válidos             | Valores inválidos distorsionan la proyección de la base recurrente                     |
| Tasas de Conversión del Embudo | Deben permanecer dentro de un rango porcentual lógico | Valores fuera de rango distorsionan la conversión del pipeline                      |
| Curva de Realización de WIP | Los porcentajes M0–M3 deberían totalizar 100%          | Una realización incompleta produce un tiempo incorrecto de ingresos de proyecto     |
| Horas Estándar Mensuales | Deben ser positivas                                        | Una base de capacidad cero o negativa invalida los cálculos de FTE         |
| Utilización Productiva  | Debe ser un porcentaje válido                              | Una utilización inválida distorsiona el FTE requerido                            |
| Días de Capital de Trabajo | Deben ser supuestos operativos no negativos            | Días inválidos distorsionan AR, inventario o AP                            |
| Plazo de la Deuda (Tenor) | Debe ser positivo                                         | Un plazo inválido rompe la amortización de capital                          |
| Tasa de Interés de la Deuda | Debe ser un porcentaje válido                         | Una tasa inválida distorsiona el gasto financiero                                |
| Balance de Apertura     | Debe reconciliar con el punto de partida del pronóstico    | Saldos de apertura incorrectos se propagan a los tres estados       |
| Verificación del Balance | Activos menos pasivos y patrimonio deben reconciliar a cero | Un resultado no cero señala un error de integración que requiere investigación |

### Verificación Cruzada

La documentación de implementación reporta una verificación cruzada de las principales entradas y salidas, incluyendo los 17 campos de salida globales. También reporta una revisión de 22 fórmulas centrales de arreglos dinámicos a través del modelo de 11 hojas y una verificación de supuestos codificados. 

El objetivo de control documentado es:

```text
Inputs
  ↓
Operating calculations
  ↓
Financial outputs
  ↓
Three-statement reconciliation
  ↓
Management decision
```

Un pronóstico no debería considerarse completo meramente porque fórmulas individuales devuelven números. Las salidas deben permanecer conectadas a sus supuestos de origen y reconciliarse a través de los estados financieros.

</details>

---

## La Lógica de Negocio y Metodología

El modelo usa un principio simple: **el pronóstico financiero debería seguir la forma en que el negocio realmente opera**.

La actividad de ventas crea demanda potencial. Los supuestos de conversión convierten esa demanda en órdenes. La capacidad de entrega determina si esas órdenes pueden ejecutarse. El tiempo del proyecto determina cuándo el valor contractual se convierte en ingresos reconocidos. Los costos siguen la actividad resultante. El capital de trabajo y el financiamiento determinan cuánto efectivo se requiere para soportar la operación.

Cuatro métodos hacen esa cadena utilizable para la gerencia:

* **La comparación de escenarios** separa los supuestos Base, Al alza y A la baja para que la gerencia pueda ver si una decisión permanece viable cuando la conversión o la demanda cambian.

* **El pronóstico de pipeline a carga de trabajo** traduce el crecimiento de ventas en requerimientos de entrega, haciendo visibles las restricciones de personal antes de que se conviertan en problemas de entrega.

* **El análisis del momento de ingresos** separa el valor contractual de los ingresos reconocidos, previniendo que el reconocimiento temprano de ingresos cree una visión engañosa de la rentabilidad a corto plazo.

* **El pronóstico de capital de trabajo** muestra cómo los términos de pago del cliente, el inventario, el WIP y el crédito del proveedor afectan los requerimientos de financiamiento, para que el crecimiento rentable no se confunda automáticamente con crecimiento generador de efectivo.

* **La reconciliación de tres estados** obliga a los supuestos operativos, la rentabilidad, los movimientos del balance, el financiamiento y el efectivo a coincidir, haciendo que las inconsistencias inexplicadas del modelo sean más fáciles de aislar.

La pregunta comercial por lo tanto no es simplemente **"¿Cuántos ingresos puede generar el negocio?"**

Es:

> **¿Cuánto puede el negocio vender, entregar, reconocer, financiar y, en última instancia, convertir en generación sostenible de efectivo?**

## Otras Herramientas de Esta Serie

* **Kits de Herramientas de Apoyo a la Decisión Operativa** — modelos Excel ligeros para convertir datos operativos desordenados en decisiones repetibles.

* **Herramientas de Rentabilidad y Reconciliación** — modelos enfocados en visibilidad de margen, asignación de costos y reconciliación financiera.

* **Herramientas de Planificación y Capacidad** — libros de planificación operativa que conectan la demanda con los recursos disponibles.

## Licencia

Este proyecto se publica bajo la **Licencia Apache 2.0**.

Consulta el archivo `LICENSE` para los términos completos de la licencia. 
