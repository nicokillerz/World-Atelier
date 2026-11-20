/* World Atelier - localization layer.
 * The application content and saved project data remain in the user's language.
 * Only exact, known interface strings and interface attributes are translated.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'world-atelier-language';
  const translations = {
    'Nenhum mundo ainda': 'No worlds yet',
    '⌕ Buscar': '⌕ Search',
    '⚙ Configurações': '⚙ Settings',
    'Configurações': 'Settings',
    'Configurações do projeto': 'Project settings',
    'Escolher seções do projeto': 'Choose project sections',
    'Marque apenas as ferramentas que deseja usar neste projeto.': 'Select only the tools you want to use in this project.',
    'Perfil do projeto': 'Project profile',
    'Perfil Universo — todas as ferramentas': 'Universe profile — all tools',
    'Perfil OC — organização simplificada': 'OC profile — simplified workspace',
    'Perfil Customizável — escolha as seções': 'Custom profile — choose sections',
    'Você pode trocar de perfil depois. Os dados das seções ocultas continuam guardados.': 'You can change the profile later. Data from hidden sections will remain saved.',
    'PAINEL DO PROJETO · PERFIL OC': 'PROJECT DASHBOARD · OC PROFILE',
    'PAINEL DO UNIVERSO': 'UNIVERSE DASHBOARD',
    'Sinopse / premissa geral': 'Synopsis / general premise',
    'Sinopse / informações gerais': 'Synopsis / general information',
    '🎨 Alterar capa': '🎨 Change cover',
    '🎨 Editar capa': '🎨 Edit cover',
    'Explorar personagens': 'Explore characters',
    '📝 Sobre o mundo / Editar informações': '📝 About this world / Edit information',
    'Escolha por onde continuar': 'Choose where to continue',
    'Seções organizadas por área de trabalho': 'Sections organized by workspace',
    'Retomar de onde parou': 'Pick up where you left off',
    'Acessos rápidos deste universo': 'Quick links for this universe',
    'HISTÓRIA MAIS RECENTE': 'MOST RECENT STORY',
    'Continuar organizando →': 'Continue organizing →',
    'NARRATIVA': 'STORYTELLING',
    'Comece uma história': 'Start a story',
    'Abrir histórias →': 'Open stories →',
    'ELENCO': 'CAST',
    'Adicione seus primeiros personagens': 'Add your first characters',
    'Abrir personagens →': 'Open characters →',
    '+ Criar sub-mundo': '+ Create sub-world',
    'Apagar mundo': 'Delete world',
    '← Painel do mundo': '← World dashboard',
    'Tags de personagem': 'Character tags',
    '+ Criar tag': '+ Create tag',
    '+ Novo personagem': '+ New character',
    '+ Sub-mundo': '+ Sub-world',
    'Todos': 'All',
    'Este mundo ainda não tem personagens.': 'This world does not have any characters yet.',
    'Universal (aparece nos sub-mundos)': 'Universal (appears in sub-worlds)',
    'Níveis de maestria': 'Mastery levels',
    'Personalize os níveis usados pelos personagens nos poderes.': 'Customize the levels characters can use for powers.',
    '+ Nível de maestria': '+ Mastery level',
    '← Personagens': '← Characters',
    '✧ Ficha de exibição': '✧ Presentation sheet',
    'Apagar': 'Delete',
    'Não definida': 'Not set',
    'Prévia da cor': 'Color preview',
    'Recursos / atributos rastreáveis': 'Trackable resources / attributes',
    'Ex.: HP, MP, XP, nível, dinheiro...': 'E.g. HP, MP, XP, level, money...',
    'Nenhum recurso cadastrado.': 'No resources added.',
    '+ Adicionar recurso': '+ Add resource',
    'Tags': 'Tags',
    'Crie tags na lista de personagens.': 'Create tags in the character list.',
    'História': 'Story',
    'Ficha de exibição': 'Presentation sheet',
    'Resumo para apresentação': 'Presentation summary',
    '+ Adicionar cor': '+ Add color',
    'Até 10 cores. Use o conta-gotas para escolher diretamente na arte principal.': 'Up to 10 colors. Use the eyedropper to pick colors directly from the main artwork.',
    'A paleta aparece no topo da ficha limpa de apresentação.': 'The palette appears at the top of the clean presentation sheet.',
    'Poderes': 'Powers',
    'Paleta de cores': 'Color palette',
    '← Voltar à ficha': '← Back to sheet',
    'Imprimir / Salvar como PDF': 'Print / Save as PDF',
    'Sobre': 'About',
    'CONTA-GOTAS DA ARTE PRINCIPAL': 'MAIN ART EYEDROPPER',
    'Fechar ✕': 'Close ✕',
    'A imagem inteira fica visível; as laterais não são cortadas.': 'The full image remains visible; the sides are not cropped.',
    'Sobre a personalidade': 'About the personality',
    'Alinhamento moral': 'Moral alignment',
    'Espectros': 'Spectrums',
    'Atributos e prioridades (0 a 10)': 'Attributes and priorities (0 to 10)',
    'Informações adicionais': 'Additional information',
    'Sem tag': 'No tag',
    'Aparência': 'Appearance',
    'Galeria (opcional)': 'Gallery (optional)',
    '+ Adicionar imagens': '+ Add images',
    'Arraste as imagens ou use as setas para reordenar.': 'Drag images or use the arrows to reorder them.',
    'Nenhuma imagem ainda.': 'No images yet.',
    'Spoiler': 'Spoiler',
    'Rascunho': 'Draft',
    '✧ Notas de rodapé / Easter eggs': '✧ Footnotes / Easter eggs',
    'As notas inseridas no texto aparecem aqui para edição. Selecione um trecho e use o botão ✧ na barra de ferramentas.': 'Notes inserted in the text appear here for editing. Select a passage and use the ✧ button on the toolbar.',
    '✧ Curiosidade / Nota do autor': '✧ Fun fact / Author note',
    '+ Tópico': '+ Topic',
    'Todas as tags': 'All tags',
    'Soltar aqui para mover para o topo da Lore': 'Drop here to move to the top of the Lore',
    'Tags da lore': 'Lore tags',
    '+ Subtópico': '+ Subtopic',
    'Apagar tópico': 'Delete topic',
    'Universal': 'Universal',
    'Estado editorial': 'Editorial status',
    'Canônico': 'Canon',
    'Rascunho / ideia': 'Draft / idea',
    'Crie um tópico (ou selecione um) para começar a escrever a lore.': 'Create or select a topic to start writing your lore.',
    'Galeria': 'Gallery',
    'Apagar pasta': 'Delete folder',
    '+ Pasta': '+ Folder',
    '+ Imagens ou mapas (SVG)': '+ Images or maps (SVG)',
    'Nada aqui ainda. Crie pastas ou adicione mapas, artes, referências...': 'Nothing here yet. Create folders or add maps, artwork, and references...',
    '+ Adicionar': '+ Add',
    'Filtrar vínculos por personagem': 'Filter relationships by character',
    'Todos os personagens': 'All characters',
    'Mostra apenas vínculos em que o personagem selecionado participa.': 'Show only relationships involving the selected character.',
    '+ Novo vínculo': '+ New relationship',
    'Nenhum vínculo encontrado para este personagem.': 'No relationships found for this character.',
    'Tipos de vínculo': 'Relationship types',
    '+ Tipo': '+ Type',
    'Crie um vínculo (casal, família, grupo de amigos...) e escolha os personagens.': 'Create a relationship (couple, family, friend group...) and choose the characters.',
    '↺ Voltar ao padrão do tipo': '↺ Restore type defaults',
    'Personalizar só neste vínculo': 'Customize for this relationship only',
    'Toque físico permitido': 'Allowed physical contact',
    'Tipo': 'Type',
    'Membros': 'Members',
    'Crie personagens primeiro.': 'Create characters first.',
    'Dinâmica geral': 'General dynamics',
    'Relações individuais': 'Individual relationships',
    'Escolha 2 ou mais membros.': 'Choose 2 or more members.',
    'Apagar vínculo': 'Delete relationship',
    'Anos especiais (bissextos, mais curtos ou mais longos)': 'Special years (leap years, shorter or longer)',
    'A cada N anos': 'Every N years',
    'Ano específico': 'Specific year',
    'no mês': 'in month',
    'dias (negativo encurta)': 'days (negative shortens)',
    'Repete': 'Repeats',
    'Não repete': 'Does not repeat',
    'A cada N meses': 'Every N months',
    'A cada N dias': 'Every N days',
    'até': 'until',
    'sem fim': 'no end date',
    '+ definir fim': '+ set end date',
    'Eventos ligados a este personagem': 'Events linked to this character',
    'Nenhum ainda. Ligue eventos a este personagem na Linha do tempo.': 'None yet. Link events to this character in the Timeline.',
    'Ligar o texto selecionado a:': 'Link the selected text to:',
    'Tópico da lore': 'Lore topic',
    'Personagem': 'Character',
    'Item da galeria': 'Gallery item',
    'Evento da linha do tempo': 'Timeline event',
    'Local': 'Location',
    'Item': 'Item',
    'Espécie': 'Species',
    'Mapa': 'Map',
    'Termo do dicionário': 'Dictionary term',
    'Cancelar': 'Cancel',
    'Ligar': 'Link',
    'Nenhum item cadastrado': 'No items added',
    'Personagens universais': 'Universal characters',
    'Lore universal': 'Universal Lore',
    'Galeria universal': 'Universal gallery',
    '+ Adicionar marco': '+ Add milestone',
    'Quando? (data, idade ou fase)': 'When? (date, age, or phase)',
    'O que aconteceu?': 'What happened?',
    'Nenhum marco registrado ainda.': 'No milestones recorded yet.',
    'Apagar período': 'Delete period',
    '+ Período': '+ Period',
    'Criar um novo mundo': 'Create a new world',
    'Escolha o perfil que combina com este projeto. Você poderá alterá-lo depois nas configurações.': 'Choose the profile that best fits this project. You can change it later in Settings.',
    '🌌 Perfil Universo': '🌌 Universe profile',
    'Para mundos complexos, com Lore, locais, mapas, calendários, histórias, poderes e todas as ferramentas.': 'For complex worlds, with Lore, locations, maps, calendars, stories, powers, and all tools.',
    'Experiência completa →': 'Full experience →',
    '👥 Perfil OC': '👥 OC profile',
    'Para projetos leves, slice-of-life, tirinhas e fichas de personagens.': 'For lighter projects, slice-of-life, comics, and character sheets.',
    'Experiência simplificada →': 'Simplified experience →',
    '⚙ Perfil Customizável': '⚙ Custom profile',
    'Escolha exatamente quais módulos estarão disponíveis neste projeto.': 'Choose exactly which modules will be available in this project.',
    'Montar meu espaço →': 'Set up my workspace →',
    '↥ Importar mundo': '↥ Import world',
    '+ Coleção': '+ Collection',
    '+ Novo mundo': '+ New world',
    'Sub-mundos': 'Sub-worlds',
    'Fonte do título': 'Title source',
    'Coleção': 'Collection',
    '🎲 Aleatorizar': '🎲 Randomize',
    '🖼 Usar minha imagem': '🖼 Use my image',
    'Remover imagem': 'Remove image',
    'título sobre a imagem': 'title over the image',
    'Tags de eventos': 'Event tags',
    'Separe os tipos de acontecimento: feriado, nascimento, morte, guerra... Crie as suas.': 'Organize event types: holidays, births, deaths, wars... Create your own.',
    'Datas que se repetem todo ano (com vigência)': 'Dates that repeat every year (with an active period)',
    'Contagem de anos': 'Year numbering',
    'Antes e depois de um marco (anos de trás pra frente antes do marco)': 'Before and after an era marker (years count backward before the marker)',
    'Contínua (um número só, pode ser negativo)': 'Continuous (one number, may be negative)',
    'Meses': 'Months',
    'Dias da semana': 'Days of the week',
    'Dia da semana do 1º dia do ano 1': 'Weekday of the first day of year 1',
    'Luas (ou ciclos equivalentes)': 'Moons (or equivalent cycles)',
    'Fases, em ordem': 'Phases, in order',
    'Apagar este ciclo': 'Delete this cycle',
    'Mês': 'Month',
    'Dia': 'Day',
    'Em vigor desde': 'Active since',
    'Removida em': 'Removed in',
    'Nunca, continua para sempre': 'Never, continues forever',
    'Definir ano de remoção': 'Set removal year',
    'Nunca remover': 'Never remove',
    '+ Evento neste dia': '+ Event on this day',
    '+ Data anual neste dia': '+ Annual date on this day',
    'Este mundo usa o calendário do mundo-pai. Edite lá.': 'This world uses its parent world’s calendar. Edit it there.',
    '⚙ Configurações do calendário': '⚙ Calendar settings',
    '🔁 Datas anuais e tags': '🔁 Annual dates and tags',
    '+ Novo evento': '+ New event',
    'Os eventos aparecem também no calendário.': 'Events also appear on the calendar.',
    'Recolher tudo': 'Collapse all',
    'Expandir tudo': 'Expand all',
    '+ Adicionar personagem': '+ Add character',
    'Locais envolvidos': 'Related locations',
    'Nenhum local selecionado.': 'No location selected.',
    'Selecionar local para adicionar…': 'Select a location to add…',
    'Ano': 'Year',
    'Tópico da Lore relacionado': 'Related Lore topic',
    'Abrir tópico →': 'Open topic →',
    'Repetir todo ano': 'Repeat every year',
    'Nenhum evento ainda. Marque mortes, guerras, fundações, mudanças de era...': 'No events yet. Record deaths, wars, foundations, era changes...',
    'Crie vínculos com 2 ou mais membros para ver o grafo.': 'Create relationships with 2 or more members to see the graph.',
    'Clique num personagem para abrir a ficha. O grafo mostra o momento ativo de cada vínculo.': 'Click a character to open their sheet. The graph shows the active moment of each relationship.',
    '📍 Pinos no mapa': '📍 Map pins',
    'Escolha se deseja marcar um personagem ou evento e clique no ponto exato do mapa.': 'Choose whether to mark a character or event, then click the exact point on the map.',
    'Tipo de pino': 'Pin type',
    'Evento': 'Event',
    'Escolha um evento...': 'Choose an event...',
    'Escolha um personagem...': 'Choose a character...',
    'Nenhum pino neste mapa.': 'No pins on this map.',
    'Sem link': 'No link',
    'Parte selecionada → tópico ou local:': 'Selected part → topic or location:',
    'Área selecionada → tópico ou local:': 'Selected area → topic or location:',
    'Apagar área': 'Delete area',
    '← Galeria': '← Gallery',
    '↩ Voltar ao local': '↩ Back to location',
    'Descrição': 'Description',
    'Favoritos': 'Favorites',
    'Áreas de escrita livres': 'Free-writing areas',
    'Habilidades (pontos de 0 a 10)': 'Skills (points from 0 to 10)',
    'Crie habilidades do mundo na aba “Habilidades e poderes” do mundo.': 'Create world skills in the world’s “Skills and powers” tab.',
    'Poderes do mundo (maestria)': 'World powers (mastery)',
    'Nenhum poder criado no mundo ainda.': 'No world powers created yet.',
    'Poderes exclusivos deste personagem': 'Powers exclusive to this character',
    'Não definido': 'Not set',
    'Onde aparece': 'Where it appears',
    'Nenhuma referência encontrada ainda.': 'No references found yet.',
    'Apagar local': 'Delete location',
    'Local dentro de': 'Location inside',
    'Imagens relacionadas': 'Related images',
    'Abrir na galeria ↗': 'Open in gallery ↗',
    'Eventos neste local': 'Events at this location',
    'Nenhum evento cadastrado.': 'No events added.',
    'Personagens neste local': 'Characters at this location',
    'Nenhum personagem está associado a este local.': 'No characters are associated with this location.',
    'Escolha um local ou crie o primeiro.': 'Choose a location or create the first one.',
    '+ Novo local': '+ New location',
    'Organize reinos, cidades, bairros, casas e interiores com cartões por nível.': 'Organize kingdoms, cities, districts, homes, and interiors with level-based cards.',
    'Nenhum local cadastrado.': 'No locations added.',
    'Sem evento vinculado': 'No linked event',
    'Cenário / sub-mundo onde se passa': 'Setting / sub-world where it takes place',
    'Calendário de': 'Calendar for',
    'Ou vincule a um evento da linha do tempo': 'Or link to a timeline event',
    'Preencha a data do calendário ou selecione um evento. O modo cronológico usa essa referência para ordenar.': 'Enter a calendar date or select an event. Chronological mode uses this reference for sorting.',
    'Não há personagens cadastrados nesta árvore de mundos.': 'There are no characters in this world tree yet.',
    '+ Nova história': '+ New story',
    'Ordem de leitura': 'Reading order',
    'Ordem cronológica': 'Chronological order',
    'Crie uma história para organizar capas, arcos, capítulos e personagens.': 'Create a story to organize covers, arcs, chapters, and characters.',
    'Alterar capa': 'Change cover',
    '↓ Markdown': '↓ Markdown',
    'Livro HTML': 'HTML book',
    'Sinopse / descrição': 'Synopsis / description',
    'Em revisão': 'In review',
    'Pronto': 'Ready',
    'Capa': 'Cover',
    '↓ MD': '↓ MD',
    'Resumo / anotações': 'Summary / notes',
    'Texto do capítulo / rascunho': 'Chapter text / draft',
    'Personagens que aparecem': 'Characters appearing',
    '↓ Arco MD': '↓ Arc MD',
    '+ Novo capítulo': '+ New chapter',
    'Apagar arco': 'Delete arc',
    'Capítulos': 'Chapters',
    'Ainda não há capítulos neste arco.': 'There are no chapters in this arc yet.',
    'Adicione um arco ou volume para começar a organizar os capítulos.': 'Add an arc or volume to start organizing chapters.',
    'Arcos / volumes': 'Arcs / volumes',
    '+ Novo arco / volume': '+ New arc / volume',
    'Nota minimizada': 'Collapsed note',
    'Notas e Inspirações': 'Notes and Inspirations',
    'Um caderno livre para referências, piadas internas, ideias gerais, detalhes de continuidade e qualquer coisa que você não queira perder.': 'A freeform notebook for references, inside jokes, general ideas, continuity details, and anything you do not want to lose.',
    'Nota principal': 'Main note',
    'Outras notas': 'Other notes',
    '+ Nova nota': '+ New note',
    'Nenhuma nota adicional ainda. Crie uma para separar referências, ideias ou assuntos diferentes.': 'No additional notes yet. Create one to separate references, ideas, or different topics.',
    'Nenhuma imagem vinculada': 'No linked image',
    'Nenhuma ilustração vinculada ainda. Adicione uma imagem à Galeria / Mural e selecione-a aqui.': 'No illustration linked yet. Add an image to the Gallery / Wall and select it here.',
    'A imagem vinculada não está mais na galeria. Escolha outra.': 'The linked image is no longer in the gallery. Choose another.',
    '+ Novo cenário / tirinha': '+ New scene / comic',
    'Organize ideias de cenas, roteiros curtos e diálogos. Arraste os cartões entre as colunas conforme o trabalho avança e vincule a ilustração correspondente na Galeria / Mural.': 'Organize scene ideas, short scripts, and dialogue. Drag cards between columns as work progresses and link the corresponding illustration in the Gallery / Wall.',
    'Descrição / ideia da cena': 'Description / scene idea',
    'Roteiro / diálogos': 'Script / dialogue',
    'Vincular imagem da Galeria / Mural': 'Link an image from the Gallery / Wall',
    'Escolha uma ilustração que já esteja cadastrada na galeria de qualquer mundo desta árvore.': 'Choose an illustration already added to the gallery of any world in this tree.',
    'Personagens envolvidos': 'Characters involved',
    'Solte uma ideia aqui.': 'Drop an idea here.',
    'Categoria': 'Category',
    'Sem categoria': 'Uncategorized',
    'Quando? (opcional)': 'When? (optional)',
    '+ Novo acontecimento': '+ New event',
    'Linha do tempo livre · sem calendário': 'Free timeline · no calendar',
    '🎨 Categorias e cores': '🎨 Categories and colors',
    '+ Categoria': '+ Category',
    'Organize os acontecimentos na ordem em que ocorreram. Arraste os cartões ou use as setas para reordenar. A categoria colore a lateral do cartão recolhido.': 'Organize events in the order they happened. Drag cards or use the arrows to reorder them. The category colors the side of a collapsed card.',
    'Nenhum acontecimento registrado. Adicione o primeiro marco da história.': 'No events recorded. Add the first milestone in the story.',
    'Adicione uma imagem de mapa': 'Add a map image',
    'Use PNG, JPG ou WEBP. Os marcadores serão posicionados sobre a imagem.': 'Use PNG, JPG, or WEBP. Markers will be placed on top of the image.',
    'Nenhum mapa cadastrado ainda.': 'No maps added yet.',
    '+ Criar mapa': '+ Create map',
    'Adicione uma imagem de mapa gerada em outro programa e coloque marcadores coloridos para cidades, vilas, capitais e locais importantes.': 'Add a map image created in another program and place colored markers for cities, villages, capitals, and important locations.',
    '+ Novo mapa': '+ New map',
    '🖼️ Adicionar / trocar imagem': '🖼️ Add / change image',
    'Apagar mapa': 'Delete map',
    'Categoria do marcador': 'Marker category',
    'Nome do novo marcador': 'New marker name',
    '🎨 Categorias e cores dos marcadores': '🎨 Marker categories and colors',
    'Marcadores': 'Markers',
    'Sem local vinculado': 'No linked location',
    'Capital': 'Capital',
    'Nenhum marcador ainda.': 'No markers yet.',
    '+ Novo item': '+ New item',
    '🎨 Cores das categorias': '🎨 Category colors',
    'Nenhum item cadastrado.': 'No items added.',
    '🖼️ Imagem': '🖼️ Image',
    '◇ Sem imagem': '◇ No image',
    'Link para tópico da Lore': 'Link to a Lore topic',
    'Atributos opcionais': 'Optional attributes',
    '+ Atributo': '+ Attribute',
    'Selecione ou crie um item.': 'Select or create an item.',
    'Nenhuma espécie nesta categoria.': 'No species in this category.',
    'Classificação': 'Classification',
    'Exceção: criatura irracional consciente': 'Exception: conscious non-rational creature',
    'Variação de outra espécie (opcional)': 'Variation of another species (optional)',
    'Espécie independente': 'Independent species',
    'Informações principais': 'Main information',
    'Descrição geral': 'General description',
    'Campos personalizados': 'Custom fields',
    '+ Adicionar informação': '+ Add information',
    'Variações / espécies relacionadas': 'Variations / related species',
    'Nenhuma variação cadastrada.': 'No variations added.',
    'Personagens desta espécie': 'Characters of this species',
    'Nenhum personagem vinculado.': 'No linked characters.',
    'Selecione uma espécie ou crie a primeira.': 'Select a species or create the first one.',
    '⚙ Editar categorias / nomes dos campos': '⚙ Edit categories / field names',
    '+ Campo': '+ Field',
    '+ Nova espécie': '+ New species',
    'Nenhum': 'None',
    'Selecione um ou mais registros ou clique em “Nenhum” para limpar os vínculos.': 'Select one or more entries, or click “None” to clear the links.',
    '+ Criar sistema': '+ Create system',
    'Magia, economia, progressão, regras e mecânicas usam o mesmo tipo de registro.': 'Magic, economy, progression, rules, and mechanics use the same record type.',
    '⚙ Categorias e cores dos sistemas': '⚙ System categories and colors',
    'Cada sistema pode ter overview, custos, limitações, regras, escalas e subitens próprios. Arraste os subitens para reorganizar.': 'Each system can have an overview, costs, limitations, rules, scales, and its own subitems. Drag subitems to rearrange them.',
    'Tipo de sistema': 'System type',
    'Overview': 'Overview',
    'Fonte / origem': 'Source / origin',
    'Custos': 'Costs',
    'Limitações': 'Limitations',
    'Regras / condições': 'Rules / conditions',
    'Níveis / escalas': 'Levels / scales',
    'Descrição / efeito': 'Description / effect',
    'Atributos / efeitos': 'Attributes / effects',
    '+ Subitem': '+ Subitem',
    '+ Regra': '+ Rule',
    '+ Nível': '+ Level',
    'Apagar sistema': 'Delete system',
    'Nenhum sistema cadastrado. Crie o primeiro.': 'No systems added. Create the first one.',
    '+ Novo idioma': '+ New language',
    'Apagar idioma': 'Delete language',
    'Vocabulário': 'Vocabulary',
    '+ Palavra': '+ Word',
    'Crie ou selecione um idioma para começar o dicionário.': 'Create or select a language to start the dictionary.',
    'Guarde falas marcantes, ditados, bordões e exemplos do jeito como este personagem costuma falar.': 'Save memorable lines, sayings, catchphrases, and examples of how this character usually speaks.',
    'Contexto / ocasião / tom de voz': 'Context / occasion / tone of voice',
    '+ Nova citação': '+ New quote',
    'Qtd.': 'Qty.',
    'Imagem': 'Image',
    'Objetos importantes, armas, acessórios, presentes, livros mágicos e itens que acompanham o personagem.': 'Important objects, weapons, accessories, gifts, magical books, and items carried by the character.',
    'Adicionar item cadastrado no mundo': 'Add an item from the world',
    'Selecione um item existente': 'Select an existing item',
    '＋ Adicionar ao inventário': '＋ Add to inventory',
    '+ Criar item personalizado': '+ Create custom item',
    'Nenhum cadastrado.': 'None added.',
    'Árvore genealógica': 'Family tree',
    'Ainda não há parentescos suficientes para montar a árvore.': 'There are not enough family relationships to build the tree yet.',
    'Adicionar / editar parentescos': 'Add / edit family relationships',
    'Pais / responsáveis': 'Parents / guardians',
    'Escolha um personagem': 'Choose a character',
    'Adicionar pai / mãe': 'Add parent',
    'Filhos': 'Children',
    'Adicionar filho / filha': 'Add child',
    'Irmãos': 'Siblings',
    'Adicionar irmão / irmã': 'Add sibling',
    '✧ Nova nota / Easter egg': '✧ New note / Easter egg',
    'Escreva uma curiosidade, explicação de lore ou comentário do autor. A nota ficará ligada a uma pequena marca no texto.': 'Write a fun fact, lore explanation, or author comment. The note will be linked to a small marker in the text.',
    'Adicionar nota': 'Add note',
    'Notas / Easter eggs': 'Notes / Easter eggs',
    'Digite para pesquisar mundos, OCs, itens, citações, cenários, locais, lore e capítulos.': 'Type to search worlds, OCs, items, quotes, scenes, locations, lore, and chapters.',
    'Nenhum resultado encontrado.': 'No results found.',
    'BUSCA GLOBAL': 'GLOBAL SEARCH',
    'Esc ✕': 'Esc ✕',
    'Pesquisar em': 'Search in',
    'Todos os mundos': 'All worlds',
    'Momento': 'Moment',
    '+ Novo momento': '+ New moment',
    'Evento / marco que motivou esta mudança (opcional)': 'Event / milestone that prompted this change (optional)',
    'Negrito': 'Bold',
    'Itálico': 'Italic',
    'Sublinhado': 'Underline',
    'Lista com marcadores': 'Bulleted list',
    'Lista numerada': 'Numbered list',
    'Ligar a outro tópico, personagem ou local': 'Link to another topic, character, or location',
    'Adicionar nota de rodapé / easter egg': 'Add footnote / easter egg',
    'Confirmar': 'Confirm',
    'Menu': 'Menu',
    'Coleções': 'Collections',
    'Busca global (Ctrl+K)': 'Global search (Ctrl+K)',
    'Nova tag (ex: Mentor)': 'New tag (e.g. Mentor)',
    'Capturar uma cor da arte principal': 'Pick a color from the main artwork',
    'Conta-gotas': 'Eyedropper',
    'Remover cor': 'Remove color',
    'Lado B': 'Side B',
    'Grupo': 'Group',
    'Apagar tag': 'Delete tag',
    'Nova tag (ex: Chibi, Versão criança)': 'New tag (e.g. Chibi, Child version)',
    'Imagem principal': 'Main image',
    'Curiosidade, explicação ou comentário do autor...': 'Fun fact, explanation, or author comment...',
    'Nova tag': 'New tag',
    'Mostrar ou ocultar os sub-mundos nas coleções': 'Show or hide sub-worlds in collections',
    'Importar um projeto sem substituir os demais': 'Import a project without replacing the others',
    'Subir': 'Move up',
    'Descer': 'Move down',
    'Apagar coleção': 'Delete collection',
    'Exportar mundo e todos os sub-mundos': 'Export world and all sub-worlds',
    'Dias do mês': 'Days of the month',
    'Abrir na linha do tempo': 'Open in timeline',
    'Minimizar': 'Collapse',
    'Remover pino': 'Remove pin',
    'Adicionar sub-local': 'Add sub-location',
    'Minimizar / expandir': 'Collapse / expand',
    'Status do capítulo': 'Chapter status',
    'Visibilidade editorial': 'Editorial visibility',
    'Exportar capítulo em Markdown': 'Export chapter as Markdown',
    'Exportar este arco em Markdown': 'Export this arc as Markdown',
    'Apagar cenário': 'Delete scene',
    'Nova categoria': 'New category',
    'Nome da cidade / local': 'City / location name',
    'Nova categoria geográfica': 'New geographic category',
    'Nome da categoria': 'Category name',
    'Excluir categoria': 'Delete category',
    'Remover campo': 'Remove field',
    'Identificador (ex.: agilityBonus)': 'Identifier (e.g. agilityBonus)',
    'Nome exibido (ex.: Bônus de agilidade)': 'Display name (e.g. Agility bonus)',
    'Escreva sua nota aqui...': 'Write your note here...',
    'Buscar OC, item, lugar, palavra da lore...': 'Search OC, item, location, or Lore term...',
    'Copia o estado atual como ponto de partida': 'Copies the current state as a starting point',
    'Apagar este momento': 'Delete this moment',
    'Nome do projeto': 'Project name',
    'Nome do mundo': 'World name',
    'Descrição / sinopse': 'Description / synopsis',
    'Nome': 'Name',
    'Idade': 'Age',
    'Nascimento': 'Date of birth',
    'Gênero': 'Gender',
    'Pronomes': 'Pronouns',
    'Localização atual': 'Current location',
    'Cor das falas': 'Dialogue color',
    'Manias e hábitos': 'Quirks and habits',
    'Objetivos e motivações': 'Goals and motivations',
    'Segredos': 'Secrets',
    'Altura': 'Height',
    'Estilo de roupas': 'Clothing style',
    'Nome da pasta': 'Folder name',
    'Tag da pasta': 'Folder tag',
    'Dentro de': 'Inside',
    'Nome da era antes do marco (ex: a.D.)': 'Name of the era before the marker (e.g. BCE)',
    'Nome da era depois do marco (ex: d.D.)': 'Name of the era after the marker (e.g. CE)',
    'Primeiro ano da era “depois” (padrão 1)': 'First year of the “after” era (default: 1)',
    'Primeiro ano da era “antes” (vazio = sem limite)': 'First year of the “before” era (blank = no limit)',
    'Sufixo dos anos (opcional)': 'Year suffix (optional)',
    'Dias do ciclo': 'Cycle days',
    'Deslocamento inicial (dias)': 'Initial offset (days)',
    'Tópico relacionado': 'Related topic',
    'Nome do grupo racional': 'Name of the rational group',
    'Nome do grupo irracional': 'Name of the non-rational group',
    'Adicionar uma tag': 'Add a tag',
    'Título do tópico': 'Topic title',
    'Descrição do mundo': 'World description',
    'Descreva a história, o cenário ou a ideia geral...': 'Describe the story, setting, or general idea...',
    'Descreva a premissa, atmosfera e informações gerais...': 'Describe the premise, atmosphere, and general information...',
    'De onde vem o sistema?': 'Where does the system come from?',
    'O que é consumido ou pago?': 'What is consumed or paid?',
    'O que não é possível fazer?': 'What is not possible?',
    'Condições, exceções e regras...': 'Conditions, exceptions, and rules...',
    'Ranks, níveis, escalas...': 'Ranks, levels, scales...',
    'Como funciona este nível, regra, maldição etc.': 'How this level, rule, curse, etc. works',
    'Visão geral do funcionamento...': 'General overview of how it works...',
    'História, falantes, regras de pronúncia...': 'History, speakers, pronunciation rules...',
    'Como é a dinâmica entre os dois?': 'What is the dynamic between them?',
    'Outros limites de toque ou observações': 'Other contact boundaries or notes',
    'Descreva a cena, o cenário ou a ideia...': 'Describe the scene, setting, or idea...',
    'Como funciona o grupo ou casal no geral?': 'How does the group or couple work overall?',
    'Descreva o local...': 'Describe the location...',
    'Nome do momento': 'Moment name',
    'Palavra': 'Word',
    'Tradução': 'Translation',
    'Observação': 'Note',
    'Nome do idioma': 'Language name',
    'Título do sistema': 'System title',
    'Nome do subitem': 'Subitem name',
    'Como funciona este nível, regra, maldição etc.': 'How this level, rule, curse, etc. works',
    'Atributo': 'Attribute',
    'Barra': 'Slider',
    'Valor: +10 agilidade, -5 HP...': 'Value: +10 agility, -5 HP...',
    'Nome do local': 'Location name',
    'Nome do item': 'Item name',
    'Nome da espécie': 'Species name',
    'Nome da habilidade': 'Skill name',
    'Nome do poder': 'Power name',
    'Descreva...': 'Describe...',
    'Escreva aqui...': 'Write here...',
    'Digite aqui...': 'Type here...',
    '🌐 Sub-mundos': '🌐 Sub-worlds',
    'Todas': 'All',
    'Apagar nota': 'Delete note',
    'Nova tag (ex: Casas, Criaturas)': 'New tag (e.g. Houses, Creatures)',
    'Tag': 'Tag',
    'Pasta': 'Folder',
    '(raiz)': '(root)',
    'Narrativa': 'Storytelling',
    'Elenco': 'Cast',
    'Universo': 'Universe',
    'Criação': 'Creation',
    '👥 Personagens': '👥 Characters',
    '♡ Relacionamentos': '♡ Relationships',
    '🖼️ Galeria / Mural': '🖼️ Gallery / Wall',
    '✦ Cenários / Tirinhas': '✦ Scenes / Comics',
    '✎ Notas e Inspirações': '✎ Notes and Inspirations',
    '⌁ Linha do tempo': '⌁ Timeline',
    'Personagens': 'Characters',
    'Relacionamentos': 'Relationships',
    'Galeria / Mural': 'Gallery / Wall',
    'Cenários': 'Scenes',
    'Tirinhas': 'Comics',
    'Notas': 'Notes',
    'Notas e inspirações': 'Notes and inspirations',
    'Locais': 'Locations',
    'Habilidades e poderes': 'Skills and powers',
    'Linha do tempo': 'Timeline',
    'Linha do tempo (calendário)': 'Timeline (calendar)',
    'Linha do tempo livre': 'Free timeline',
    'Calendário': 'Calendar',
    'Histórias': 'Stories',
    'Lore / Wiki': 'Lore / Wiki',
    'Mapas': 'Maps',
    'Itens': 'Items',
    'Espécies e bestiário': 'Species and bestiary',
    'Sistemas': 'Systems',
    'Dicionário': 'Dictionary',
    'Galeria': 'Gallery',
    'Perfil Universo': 'Universe profile',
    'Perfil OC': 'OC profile',
    'Perfil Customizável': 'Custom profile',
    'Sair da leitura': 'Exit reading mode',
    'Modo leitura': 'Reading mode',
    'Bem-vindo ao World Atelier': 'Welcome to World Atelier',
    'Escolha a pasta do seu computador onde seus mundos serão guardados. Tudo é salvo automaticamente lá:': 'Choose the folder on your computer where your worlds will be stored. Everything is saved there automatically:',
    '— índice das coleções e projetos': '— collections and projects index',
    '— uma pasta independente para cada mundo principal, com seus sub-mundos e imagens': '— a separate folder for each main world, with its sub-worlds and images',
    '— cópias automáticas e mundos removidos arquivados': '— automatic backups and archived deleted worlds',
    'Dica: escolha uma pasta sincronizada (OneDrive, Google Drive, Dropbox) para ter backup na nuvem.': 'Tip: choose a synced folder (OneDrive, Google Drive, Dropbox) to keep a cloud backup.',
    'Usar a pasta padrão': 'Use the default folder',
    '📁 Escolher uma pasta…': '📁 Choose a folder…',
    'Pasta de dados': 'Data folder',
    'Alterar pasta…': 'Change folder…',
    'Abrir no Explorador': 'Open in File Explorer',
    'Imagens': 'Images',
    'Imagens que nenhum mundo usa mais podem ser movidas para': 'Images no longer used by any world can be moved to',
    '(nada é apagado de verdade).': '(nothing is permanently deleted).',
    'Limpar imagens sem uso': 'Clean up unused images',
    'Backup': 'Backup',
    'A própria pasta de dados já é o seu backup. Na estante, você também pode exportar um mundo individual com toda a sua árvore de sub-mundos.': 'Your data folder is already your backup. From the library, you can also export an individual world with its entire sub-world tree.',
    'Exportar backup completo (.json)': 'Export full backup (.json)',
    'Fechar': 'Close',
    'Salvando…': 'Saving…',
    '✓ Salvo na pasta de dados': '✓ Saved to data folder',
    '⚠ Erro ao salvar': '⚠ Save error',
    'Não foi possível usar essa pasta:': 'Could not use this folder:',
    'Não foi possível gerar o backup:': 'Could not create the backup:',
    'Preparando o backup…': 'Preparing backup…',
    'Backup gerado.': 'Backup created.',
    'Nenhuma imagem sem uso encontrada.': 'No unused images found.',
    'Já existem dados do World Atelier nessa pasta. Abrir esses dados?': 'This folder already contains World Atelier data. Open it?',
    'Os dados da pasta atual continuam guardados lá.': 'The data in the current folder will remain there.',
    'Abrir': 'Open',
    'Cancelar': 'Cancel',
    'A pasta escolhida está vazia. Copiar seus mundos e imagens atuais para ela?': 'The selected folder is empty. Copy your current worlds and images to it?',
    'Copiar': 'Copy',
    'Começar vazio': 'Start empty',
    'Não foi possível usar essa pasta: ': 'Could not use this folder: ',
    'Não foi possível concluir a operação:': 'Could not complete the operation:',
    'Projeto exportado!': 'Project exported!',
    'Projeto importado!': 'Project imported!',
    'O projeto foi adicionado sem substituir os mundos existentes.': 'The project was added without replacing existing worlds.',
    'Isto substitui tudo o que há aqui. Continuar?': 'This will replace everything here. Continue?',
    'Arquivo de backup inválido.': 'Invalid backup file.',
    'Novo mundo': 'New world',
    'Novo sistema': 'New system',
    'Novo idioma': 'New language',
    'Nova habilidade': 'New skill',
    'Novo poder': 'New power',
    'Nova coleção': 'New collection',
    'Sem nome': 'Untitled',
    'Sem título': 'Untitled',
    'Sistema sem título': 'Untitled system',
    'Item sem nome': 'Unnamed item',
    'Espécie sem nome': 'Unnamed species',
    'Mundo': 'World',
    'Evento': 'Event',
    'Acontecimento': 'Event',
    'Subitem': 'Subitem',
    'REGRA': 'RULE',
    'NÍVEL': 'LEVEL',
    'SUBITEM': 'SUBITEM',
    'Incapaz': 'Unable',
    'Iniciante': 'Beginner',
    'Intermediário': 'Intermediate',
    'Avançado': 'Advanced',
    'Mestre': 'Master',
    'Nome científico': 'Scientific name',
    'Nível de ameaça / extinção': 'Threat / extinction level',
    'Habitat natural': 'Natural habitat',
    'Tempo de vida': 'Lifespan',
    'Forças': 'Strengths',
    'Fraquezas': 'Weaknesses',
    'Racional': 'Rational',
    'Irracional': 'Non-rational',
    'Arma': 'Weapon',
    'Armadura': 'Armor',
    'Poção': 'Potion',
    'Relíquia': 'Relic',
    'Ferramenta': 'Tool',
    'Outro': 'Other',
    'Continente': 'Continent',
    'Nação': 'Nation',
    'Estado': 'State',
    'Cidade': 'City',
    'Vila': 'Village',
    'Localidade': 'Settlement',
    'Protagonista': 'Protagonist',
    'Interesse romântico': 'Love interest',
    'Rival': 'Rival',
    'Vilão': 'Villain',
    'Aliado': 'Ally',
    'Referência': 'Reference',
    'Arte': 'Artwork',
    'Documento': 'Document',
    'Começar': 'Start',
    'Nome do mundo': 'World name',
    'Nome do personagem': 'Character name',
    'Descreva a história, o cenário ou a ideia geral...': 'Describe the story, setting, or general idea...',
    'Descreva a premissa, atmosfera e informações gerais...': 'Describe the premise, atmosphere, and general information...',
    'Apagar este cenário?': 'Delete this scene?', 'CONFIRMAR': 'CONFIRM', 'Confirmar': 'Confirm', 'CANCEL': 'CANCEL',
    'Novo sub-mundo': 'New sub-world', 'Novo projeto': 'New project', 'Ciclos e eventos': 'Cycles and events',
    'Novo ciclo': 'New cycle', 'Datas anuais e tags': 'Annual dates and tags', 'Feriado': 'Holiday',
    'Nascimento': 'Birthday', 'Morte': 'Death', 'Guerra': 'War', 'Fundação': 'Founding',
    'Seção atual': 'Current section', 'Abrir seções': 'Open sections', 'Novo acontecimento': 'New event',
    'Descreva o acontecimento...': 'Describe the event...', 'Configurar': 'Configure',
    'Categorias e cores': 'Categories and colors', 'Datas que se repetem todos os anos (com período ativo)': 'Dates that repeat every year (with an active period)',
    'Nova data anual': 'New annual date', 'Evento tags': 'Event tags',
    'Organize tipos de eventos: feriados, aniversários, mortes, guerras... Crie os seus.': 'Organize event types: holidays, birthdays, deaths, wars... Create your own.',
    'Novo momento': 'New moment', 'Momento inicial': 'Starting moment', 'Momento': 'Moment',
    'EVENTO / MARCO QUE MOTIVOU ESTA MUDANÇA (OPCIONAL)': 'EVENT / MILESTONE THAT PROMPTED THIS CHANGE (OPTIONAL)',
    'Básico': 'Basic', 'Personalidade': 'Personality', 'Favoritos e notas': 'Favorites and notes',
    'Citações': 'Quotes', 'Inventário': 'Inventory', 'Família': 'Family', 'Habilidades e poderes': 'Skills and powers',
    'Registre ciclos próprios deste personagem (cio, transformações, rituais...). Os períodos aparecem no calendário sem mexer no calendário geral.': 'Record this character’s own cycles (seasons, transformations, rituals...). Periods appear on the calendar without changing the general calendar.',
    'Começa': 'Starts', 'Termina': 'Ends', 'Notas deste período': 'Notes for this period',
    'Nome do ciclo (ex: Cio)': 'Cycle name (e.g. Season)', 'Apagar este idioma e seu vocabulário?': 'Delete this language and its vocabulary?',
    'Apagar este mundo?': 'Delete this world?', 'Apagar personagem?': 'Delete character?',
    'Apagar este personagem?': 'Delete this character?', 'Apagar este evento?': 'Delete this event?',
    'Apagar este item?': 'Delete this item?', 'Apagar este local?': 'Delete this location?',
    'Apagar esta história?': 'Delete this story?', 'Salvar': 'Save', 'Voltar': 'Back', 'Pesquisar': 'Search',
    'Buscar': 'Search', 'Novo': 'New', 'Editar': 'Edit', 'Excluir': 'Delete', 'Sim': 'Yes', 'Não': 'No',
    'Nenhum resultado encontrado.': 'No results found.', 'Nenhum personagem encontrado.': 'No characters found.',
    'Sem descrição.': 'No description.', 'Adicionar tag': 'Add tag', 'Criar': 'Create'
  };


  // Expanded interface coverage from the 1.3.0 localization audit.
  // These entries are fixed UI copy and preset labels, not user-authored story data.
  Object.assign(translations, {
    // Labels used by built-in presets in new and existing projects.
    'Busto': 'Bust',
    'Corpo inteiro': 'Full body',
    'Roupas': 'Clothing',
    'Acessórios': 'Accessories',
    'Cor favorita': 'Favorite color',
    'Comida favorita': 'Favorite food',
    'Bebida favorita': 'Favorite drink',
    'Música ou banda favorita': 'Favorite music or band',
    'Animal favorito': 'Favorite animal',
    'Hobby': 'Hobby',
    'Maior medo': 'Biggest fear',
    'Meus mundos': 'My worlds',
    'Progressão / Níveis / Ranks': 'Progression / Levels / Ranks',
    'Economia / Moedas': 'Economy / Currency',
    'Leis / Facções / Guildas': 'Laws / Factions / Guilds',
    'Carisma': 'Charisma',
    'Combate': 'Combat',
    'Romance': 'Romance',
    'Amizade': 'Friendship',
    'Rivalidade': 'Rivalry',
    'Quem pede desculpas primeiro?': 'Who apologizes first?',
    'Quem cede primeiro numa discussão?': 'Who gives in first during an argument?',
    'Quem dá o primeiro passo?': 'Who makes the first move?',
    'Quem é mais ciumento(a)?': 'Who is more jealous?',
    'Compatibilidade': 'Compatibility',
    'Confiança': 'Trust',
    'Química': 'Chemistry',
    'Abraço': 'Hug',
    'Mãos dadas': 'Holding hands',
    'Beijo': 'Kiss',
    'Cafuné': 'Hair stroking',
    'Colo': 'Being held',
    'Dormir junto': 'Sleeping together',
    'Atração': 'Attraction',
    'Ciúmes': 'Jealousy',
    'Carinho': 'Affection',
    'Admiração': 'Admiration',
    'Se apoiam': 'They support each other',
    'Brigam com frequência': 'They argue frequently',
    'Guardam segredos': 'They keep secrets',
    'Hierarquia clara': 'Clear hierarchy',
    'Muito próximos': 'Very close',
    'Relação tensa': 'Tense relationship',
    'Ano bissexto': 'Leap year',
    'Neutro verdadeiro': 'True Neutral',
    'Geral': 'General',
    'Tipos e padrões': 'Types and presets',
    'Ver grafo': 'View graph',
    'Linha linear': 'Linear timeline',
    'Nova tag': 'New tag',
    'Novo campo': 'New field',
    'Nome da categoria': 'Category name',
    'Nome do campo': 'Field name',
    'Nome do mapa': 'Map name',
    'Nome da nota': 'Note name',
    'Nome do nível': 'Level name',
    'Nome da área': 'Area name',
    'Nome do local': 'Location name',
    'Nova categoria': 'New category',
    'Nova área de escrita': 'New writing area',
    'Tipos e padrões': 'Types and presets',
    'VER GRAFO': 'VIEW GRAPH',
    // Correções da revisão 1.3.1: controles, exemplos e presets de espectros.
    '👁 Sub-mundos: visíveis': '👁 Sub-worlds: visible',
    'Sub-mundos: ocultos': 'Sub-worlds: hidden',
    'Um resumo curto para apresentar este personagem...': 'A short summary to introduce this character...',
    'Jeito de ser, de falar, manias, medos, valores...': 'Personality, speech, quirks, fears, and values...',
    'Cabelo, olhos, traços marcantes...': 'Hair, eyes, and distinctive features...',
    'Lado A': 'Side A',
    'Espectro': 'Spectrum',
    'Mental': 'Mental',
    'Social': 'Social',
    'Emocional': 'Emotional',
    'Moral': 'Moral',
    'Físico': 'Physical',
    'Introvertido': 'Introverted',
    'Extrovertido': 'Extroverted',
    'Caótico': 'Chaotic',
    'Comportado': 'Orderly',
    'Frio': 'Cold',
    'Sensível': 'Sensitive',
    'Inteligência': 'Intelligence',
    'Descrição (opcional)': 'Description (optional)',
    'Ex: 12/03/1998': 'E.g.: 12 Mar 1998',
    'Nuances do alinhamento (opcional)': 'Alignment nuances (optional)',
    'Hábitos, manias, pequenos costumes...': 'Habits, quirks, little routines...',
    'O que deseja alcançar?': 'What do they want to achieve?',
    'O que esconde dos outros?': 'What are they hiding from others?',
    'Nome do tipo': 'Type name',
    'Nome do vínculo': 'Relationship name',
    'Motivo (ex: Ano bissexto, Ano da Peste)': 'Reason (e.g. Leap Year, Year of the Plague)',
    'Ex.: aos 16 anos, primavera, depois da mudança': 'E.g.: at age 16, in spring, after the move',
    'Nome da coleção': 'Collection name',
    'Nome da tag': 'Tag name',
    'Nome (ex: Lua, Sol Vermelho)': 'Name (e.g. Moon, Red Sun)',
    'Nome da fase': 'Phase name',
    'Nome da data anual': 'Annual date name',
    'Por que existe, como é comemorado...': 'Why it exists and how it is celebrated...',
    'Título do evento': 'Event title',
    'O que aconteceu...': 'What happened...',
    'Título': 'Title',
    'Escreva sobre esta imagem: o que é, como é, o que acontece ali...': 'Describe this image: what it is, what it looks like, and what is happening...',
    'Título (ex: Segredos, Frases marcantes)': 'Title (e.g. Secrets, Memorable quotes)',
    'Aparência, clima, história, habitantes...': 'Appearance, climate, history, inhabitants...',
    'Título da história': 'Story title',
    'Sobre o que é esta história?': 'What is this story about?',
    'Título do capítulo': 'Chapter title',
    'O que acontece neste capítulo?': 'What happens in this chapter?',
    'Nome do arco / volume': 'Arc / volume name',
    'Qual é a ideia, o clima ou o objetivo desta cena?': 'What is the idea, mood, or goal of this scene?',
    'Escreva a sequência da tirinha, ações e falas...': 'Write the comic sequence, actions, and dialogue...',
    'Título do acontecimento': 'Event title',
    'Ex.: antes da formatura, ano 12': 'E.g.: before graduation, year 12',
    'Valor / efeito': 'Value / effect',
    'Características, cultura, comportamento...': 'Traits, culture, behavior...',
    '“Escreva a fala aqui...”': '“Write the line here...”',
    'Ex.: quando está irritada, fala baixo e com ironia': 'E.g.: when upset, they speak softly and sarcastically',
    'Descrição, origem, poderes, significado...': 'Description, origin, powers, meaning...',
    'Apresentação': 'Presentation',
    'Paleta de cores (': 'Color palette (',
    'IDEIAS': 'IDEAS',
    'Ideias': 'Ideas',
    'EM ANDAMENTO': 'IN PROGRESS',
    'Em andamento': 'In progress',
    'REVISÃO': 'REVIEW',
    'Revisão': 'Review',
    'CONCLUÍDO': 'COMPLETED',
    'Concluído': 'Completed',
    'Pessoal': 'Personal',
    'Conflito': 'Conflict',
    'Nome do ciclo (ex: Cio)': 'Cycle name (e.g. Season)',
    'Descreva o ciclo ou acontecimento...': 'Describe the cycle or event...',
    'Anote suas ideias, referências e inspirações principais aqui...': 'Write down your main ideas, references, and inspirations here...',
    'Escreva suas ideias, referências ou inspirações...': 'Write your ideas, references, or inspirations...',
    'Escreva aqui: regras, mapas, locais, calendário...': 'Write here: rules, maps, locations, calendar...',
    'Nome da categoria': 'Category name',
    'Nome do local': 'Location name',
    'Nome do item': 'Item name',
    'Nome do idioma': 'Language name',
    'Nome da espécie': 'Species name',
    'Nome do subitem': 'Subitem name',
    'Nome da nota': 'Note name',
    'Nome da pergunta': 'Question name',
    'Valor / informação': 'Value / information',
    'Valor / quantidade': 'Value / quantity',
    'Unidade (opcional)': 'Unit (optional)',
    'Cor das falas': 'Dialogue color',
    'Categorias padrão do tipo': 'Default categories for this type',
    'Categorias só deste vínculo': 'Categories for this relationship only',
    'Opções marcáveis da dinâmica geral': 'Selectable general-dynamics options',
    'Sem membros': 'No members',
    'Novo arco / volume': 'New arc / volume',
    'Novo capítulo': 'New chapter',
    'Novo cenário / tirinha': 'New scene / comic',
    'Novo acontecimento': 'New event',
    'Novo momento': 'New moment',
    'Novo vínculo': 'New relationship',
    'Novo tópico': 'New topic',
    'Novo local': 'New location',
    'Novo mapa': 'New map',
    'Novo evento': 'New event',
    'Novo recurso': 'New resource',
    'Novo atributo': 'New attribute',
    'Nova história': 'New story',
    'Nova espécie': 'New species',
    'Nova informação': 'New information',
    'Nova pergunta': 'New question',
    'Nova regra': 'New rule',
    'Nova opção': 'New option',
    'Nova escala': 'New scale',
    'Nova escala individual': 'New individual scale',
    'Nova fase': 'New phase',
    'Nova lua': 'New moon',
    'Nova nota': 'New note',
    'Nova pasta': 'New folder',
    'Nova coleção': 'New collection',
    'Nova data anual': 'New annual date',
    'Novo dia': 'New day',
    'Novo mês': 'New month',
    'Novo nível': 'New level',
    'Novo sistema': 'New system',
    'Novo idioma': 'New language',
    'Novo poder exclusivo': 'New exclusive power',
    'Novo personagem': 'New character',
    'Novo projeto': 'New project',
    'Novo item': 'New item',
    'Novo tipo': 'New type',
    'Novo toque': 'New touch',
    'Novo subitem': 'New subitem',
    'Novo sub-mundo': 'New sub-world',
    'Novo momento': 'New moment',
    'Nova tag (ex: Casas, Criaturas)': 'New tag (e.g. Houses, Creatures)',
    'Arco sem título': 'Untitled arc',
    'Capítulo sem título': 'Untitled chapter',
    'História sem título': 'Untitled story',
    'Este personagem ainda não tem uma arte principal. Adicione ou escolha uma imagem na aba Aparência.': 'This character does not have a main artwork yet. Add or choose an image in the Appearance tab.',
    'Este personagem ainda não tem um resumo de apresentação.': 'This character does not have a presentation summary yet.',
    'A imagem ainda está carregando. Tente novamente.': 'The image is still loading. Please try again.',
    'Não foi possível ler a cor desta imagem. Tente selecionar outra imagem principal ou usar o seletor de cores.': 'Could not read this image color. Try selecting another main image or using the color picker.',
    'Abra um texto da Lore ou de um capítulo antes de adicionar uma nota.': 'Open a Lore entry or chapter before adding a note.',
    'Não consegui identificar este texto para anexar a nota. Tente abrir novamente o tópico ou capítulo.': 'Could not identify this text to attach the note. Try reopening the topic or chapter.',
    'Esta nota não está mais disponível.': 'This note is no longer available.',
    'Escolha um evento antes de colocar um pino.': 'Choose an event before placing a pin.',
    'Escolha um personagem antes de colocar um pino.': 'Choose a character before placing a pin.',
    'Já existe uma categoria com esse nome.': 'A category with this name already exists.',
    'Esse vínculo criaria um ciclo na árvore genealógica.': 'This relationship would create a cycle in the family tree.',
    'O mundo precisa ter pelo menos uma categoria.': 'The world must have at least one category.',
    'Adicione primeiro uma imagem de mapa.': 'Add a map image first.',
    'Comece a escrever o capítulo aqui...': 'Start writing the chapter here...',
    'Clique em qualquer ponto da imagem para capturar a cor e preencher a Cor.': 'Click anywhere on the image to capture the color and fill in Color.',
    'A imagem inteira fica visível; as laterais não são cortadas.': 'The full image remains visible; the sides are not cropped.',
    'Arraste sobre a imagem para desenhar uma área clicável; clique numa área para escolher o tópico.': 'Drag over the image to draw a clickable area; click an area to choose its topic.',
    'Clique em uma parte do mapa e escolha o tópico que ela abre.': 'Click an area of the map and choose the topic it opens.',
    'Clique em “Adicionar marcador” para ativar o posicionamento de cidades e locais.': 'Click “Add marker” to enable city and location placement.',
    'Preencha nome e categoria abaixo e clique no ponto desejado da imagem.': 'Fill in the name and category below, then click the desired point on the image.',
    'O número ao lado é a quantidade de dias de cada mês. Ano com dias.': 'The number beside each month is its number of days. Year length: days.',
    'Este ano tem dias. Cada ponto colorido é um evento ou data anual, na cor da sua tag. Quadradinhos são ciclos de personagens.': 'This year has days. Each colored dot is an event or annual date, using its tag color. Small squares represent character cycles.',
    'Use o calendário (e os eventos) do mundo-pai:': 'Use the parent world calendar (and events):',
    'Eventos do mundo-pai': 'Parent-world events',
    'Sub-mundo de': 'Sub-world of',
    'Nenhum sistema cadastrado. Crie o primeiro.': 'No systems yet. Create the first one.',
    'Nenhuma espécie nesta categoria.': 'No species in this category.',
    'Nenhuma nota adicional ainda. Crie uma para separar referências, ideias ou assuntos diferentes.': 'No additional notes yet. Create one to separate references, ideas, or different topics.',
    'Solte uma ideia aqui.': 'Drop an idea here.',
    'Regra de ano': 'Year rule',
    'Imagem / mapa': 'Image / map',
    'Imagem do local': 'Location image',
    'Família': 'Family',
    'Inventário / pertences': 'Inventory / belongings',
    'Mundo principal': 'Main world',
    'Sistema de Magia': 'Magic system',
    'Sistema de magia': 'Magic system',
    'Mecânica do Mundo': 'World mechanics',
    'Espécie(s)': 'Species',
    'PERSONAGEM ·': 'CHARACTER ·',
    'Habilidade:': 'Skill:',
    'Item:': 'Item:',
    'Local:': 'Location:',
    'Personalidade': 'Personality',
    'Habilidades do mundo': 'World skills',
    'Poderes do mundo': 'World powers',
    'Existem para todos os personagens do mundo; cada um recebe pontos.': 'Available to every character in the world; each character receives points.',
    'Existem no mundo; cada personagem tem um nível de maestria.': 'Available in the world; each character has a mastery level.',
    'Uma linha do tempo livre para registrar fases, ciclos, descobertas e marcos importantes. Use qualquer data, idade ou referência — sem configurar calendário, meses ou luas.': 'A free timeline for recording phases, cycles, discoveries, and important milestones. Use any date, age, or reference — no calendar, months, or moons required.',
    'Os arcos ficam empilhados. Ao expandir um, os outros são minimizados para facilitar a navegação. Cada arco e capítulo pode receber cenário e data sem ocupar espaço quando não for necessário.': 'Arcs are stacked. Expanding one minimizes the others for easier navigation. Each arc and chapter can have a scene and date without taking up space when not needed.',
    'Arraste um tópico: solte no centro para aninhar, perto das bordas para posicionar antes/depois ou na faixa acima para movê-lo ao topo. Use −/＋ ou duplo clique para recolher a árvore.': 'Drag a topic: drop it in the center to nest it, near the edges to place it before or after, or in the strip above to move it to the top. Use −/＋ or double-click to collapse the tree.',
    'Clique em um retrato para abrir a ficha daquele personagem. Linhas contínuas mostram parentesco entre pais e filhos; linhas tracejadas mostram irmãos vinculados diretamente ou identificados por pais em comum.': 'Click a portrait to open that character’s sheet. Solid lines show parent-child relationships; dashed lines show siblings linked directly or identified through shared parents.',
    'A árvore de família': 'Family tree',
    'Já existe uma categoria com esse nome.': 'A category with this name already exists.',
    'Apagar esta coleção? Os mundos dela vão para a primeira coleção restante.': 'Delete this collection? Its worlds will be moved to the first remaining collection.',
    'Apagar esta espécie? Os personagens vinculados ficarão sem espécie definida.': 'Delete this species? Linked characters will have no species assigned.',
    'Apagar esta história e todos os arcos e capítulos?': 'Delete this story and all its arcs and chapters?',
    'Apagar esta nota e seu conteúdo?': 'Delete this note and its contents?',
    'Apagar esta pasta? O que está dentro dela sobe para a pasta de cima.': 'Delete this folder? Its contents will be moved to the parent folder.',
    'Apagar este arco e todos os capítulos dele?': 'Delete this arc and all its chapters?',
    'Apagar este capítulo?': 'Delete this chapter?',
    'Apagar este item da galeria?': 'Delete this gallery item?',
    'Apagar este local e todos os seus sub-locais?': 'Delete this location and all its sub-locations?',
    'Apagar este mapa?': 'Delete this map?',
    'Apagar este tópico e seus subtópicos?': 'Delete this topic and its subtopics?',
    'Apagar este vínculo?': 'Delete this relationship?',
    'Apagar este momento? Os dados dele serão perdidos.': 'Delete this moment? Its data will be lost.',
    'Apagar esta coleção?': 'Delete this collection?',
    'Apagar este idioma e seu vocabulário?': 'Delete this language and its vocabulary?',
    'Apagar este mundo e tudo o que há nele?': 'Delete this world and everything in it?',
    'Isto substitui tudo o que há aqui. Continuar?': 'This will replace everything here. Continue?',
    'Arquivo de backup inválido.': 'Invalid backup file.',
    'SVG inválido:': 'Invalid SVG:',
    'Não foi possível concluir a operação:': 'Could not complete the operation:',
    'Não foi possível gerar o backup:': 'Could not create the backup:',
    'Erro:': 'Error:',
    'Erro ao salvar': 'Save error',
    'Pasta de dados inacessível:': 'Data folder is inaccessible:',
    'Nenhuma pasta de dados escolhida.': 'No data folder has been selected.',
    'Não há dados para exportar.': 'There is no data to export.',
    'O mundo selecionado não foi encontrado.': 'The selected world could not be found.',
    'Origem não autorizada.': 'Unauthorized origin.',
    'Projeto World Atelier': 'World Atelier project',
    'Escolha a pasta onde o World Atelier vai guardar seus dados': 'Choose the folder where World Atelier will store your data',
    'Importar um mundo do World Atelier': 'Import a World Atelier world',
    'Exportar mundo e todos os sub-mundos': 'Export world and all sub-worlds',
    'Idioma / Language': 'Language',
    'Configurações / Settings': 'Settings',
    'Você poderá trocar essa opção depois nas configurações. / You can change this later in Settings.': 'You can change this later in Settings.',
    'Escolha seu idioma / Choose your language': 'Choose your language',
    'Nenhum mundo ainda': 'No worlds yet',
    'Ao chegar no ano 1 da era “antes”, o próximo é o ano 1 da era “depois”, a menos que você defina outro início acima. Exemplo: a história começa em 2064 a.D. e conta até 1 a.D.': 'When the timeline reaches year 1 of the “before” era, the next year is year 1 of the “after” era, unless you set a different starting point above. Example: the story starts in 2064 BC and continues to 1 BC.',
    'Este vínculo usa as categorias do tipo': 'This relationship uses the categories from the type',
    'valem para todos os vínculos desse tipo': 'apply to all relationships of this type',
    'Caminho de pasta inválido.': 'Invalid folder path.',
    'Dados inválidos.': 'Invalid data.',
    'O backup precisa conter uma lista de mundos.': 'The backup must contain a list of worlds.',
    'Imagem inválida.': 'Invalid image.',
    'Formato de imagem não suportado:': 'Unsupported image format:',
    'Arquivo de projeto inválido (ZIP sem diretório central).': 'Invalid project file (ZIP has no central directory).',
    'Arquivo de projeto excede os limites permitidos.': 'Project file exceeds the allowed limits.',
    'Diretório central do ZIP inválido.': 'Invalid ZIP central directory.',
    'Projetos criptografados não são suportados.': 'Encrypted projects are not supported.',
    'O projeto contém um caminho de arquivo inseguro.': 'The project contains an unsafe file path.',
    'O projeto é grande demais para importar.': 'The project is too large to import.',
    'Cabeçalho de arquivo ZIP inválido.': 'Invalid ZIP file header.',
    'Método de compactação ZIP não suportado.': 'Unsupported ZIP compression method.',
    'Nenhum projeto foi encontrado nesta pasta.': 'No project was found in this folder.',
    'O mundo selecionado não existe.': 'The selected world does not exist.',
    'Este arquivo não é um projeto World Atelier válido.': 'This file is not a valid World Atelier project.',
    'O mundo principal não foi encontrado dentro do arquivo.': 'The main world was not found in the file.',
    'Nome de imagem inválido no arquivo de projeto.': 'Invalid image name in the project file.',
    'Estado do app indisponível.': 'App state is unavailable.',
    'Ilustração da cena': 'Scene illustration',
    'Verifique se a pasta ainda existe e se há espaço no disco.': 'Check that the folder still exists and that there is enough disk space.',
    'Não foi possível salvar na pasta de dados:': 'Could not save to the data folder:',
    'Não foi possível salvar (armazenamento cheio?). Exporte um backup e remova imagens.': 'Could not save (storage full?). Export a backup and remove images.'
  });

  // 1.3.2: close remaining localization gaps reported in everyday workflows.
  Object.assign(translations, {
    'Nova História': 'New story',
    'Nova história': 'New story',
    'Registre pais, filhos e irmãos. Os vínculos de pais e filhos são recíprocos na árvore; irmãos também podem ser vinculados diretamente ou identificados por pais em comum.': 'Add parents, children, and siblings. Parent-child links are reciprocal in the family tree; siblings can also be linked directly or identified through shared parents.',
    'Fechar tipos': 'Close types',
    'Voltar aos vínculos': 'Back to relationships',
    'Tipos e padrões': 'Types and presets',
    'Ver grafo': 'View graph',
    'Local principal': 'Main location',
    'Sub-local': 'Sub-location',
    'Variação de': 'Variation of',
    'Variação de outra espécie (opcional)': 'Variation of another species (optional)',
    'Concluir marcadores': 'Finish markers',
    'Adicionar marcador': 'Add marker',
    'Origem, aparência e importância...': 'Origin, appearance, and significance...',
    'Minimizar / expandir': 'Collapse / expand',
    'Nome da anotação': 'Note title',
    'Cor do bloco': 'Note block color',
    'Apagar anotação': 'Delete note',
    'Nova anotação': 'New note',
    'Notas livres': 'Freeform notes',
    'Escreva suas anotações aqui...': 'Write your notes here...',
    'Crie blocos de anotações independentes. Escolha uma cor e minimize cada bloco para deixar visíveis apenas seu nome e sua cor.': 'Create separate note blocks. Choose a color and collapse each block to leave only its name and color visible.',
    'Nenhuma anotação ainda. Crie seu primeiro bloco.': 'No notes yet. Create your first note block.',
    'Apagar esta anotação e seu conteúdo?': 'Delete this note and its contents?',
    'Universal (aparece nos sub-mundos)': 'Universal (appears in sub-worlds)',
    'Existem para todos os personagens do mundo; cada um recebe pontos.': 'Available to every character in the world; each character receives points.',
    'Existem no mundo; cada personagem tem um nível de maestria.': 'Available in the world; each character has a mastery level.',
    'Habilidades do mundo': 'World skills',
    'Poderes do mundo': 'World powers',
    'Ex: Combate, Carisma': 'E.g. Combat, Charisma',
    'Ex: Magia de fogo': 'E.g. Fire magic',
    'Níveis de maestria': 'Mastery levels',
    'Personalize os níveis usados pelos personagens nos poderes.': 'Customize the mastery levels characters use for powers.',
    'Nome do nível': 'Level name',
    'Nível de maestria': 'Mastery level'
  });

  const reverseTranslations = Object.create(null);
  Object.entries(translations).forEach(([pt, en]) => {
    if (!(en in reverseTranslations)) reverseTranslations[en] = pt;
  });

  function readStoredLanguage() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value === 'en' || value === 'pt-BR') return value;
    } catch (_) { /* use the Electron config fallback below */ }
    try {
      const value = window.atelier?.info?.().language;
      return value === 'en' || value === 'pt-BR' ? value : null;
    } catch (_) { return null; }
  }

  const savedLanguage = readStoredLanguage();
  let language = savedLanguage || 'pt-BR';
  let observer = null;

  const USER_TEXT_SELECTOR = '[data-no-translate], [contenteditable="true"], [data-system-title], [data-species-title], [data-world-item-title], .rt, .rte';

  function protectedTextNode(node) {
    if (!node) return true;
    const el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    if (!el) return true;
    return !!el.closest(USER_TEXT_SELECTOR);
  }

  function protectedAttribute(el) {
    if (!(el instanceof Element)) return true;
    // Attribute copy (placeholder, data-ph, title, aria-label, alt) belongs to
    // the interface even when attached to an editable field. Only an explicit
    // data-no-translate marker protects these attributes; editable body text is
    // still protected separately by protectedTextNode().
    return !!el.closest('[data-no-translate]');
  }

  const reverseLookup = Object.create(null);
  Object.entries(translations).forEach(([pt, en]) => {
    reverseLookup[en.toLocaleLowerCase('en-US')] = pt;
  });
  const forwardLookup = Object.create(null);
  Object.entries(translations).forEach(([pt, en]) => {
    forwardLookup[pt.toLocaleLowerCase('pt-BR')] = en;
  });

  function preserveLetterCase(source, replacement) {
    const letters = source.replace(/[^\p{L}]/gu, '');
    if (letters && letters === letters.toLocaleUpperCase(language === 'en' ? 'en-US' : 'pt-BR')) {
      return replacement.toLocaleUpperCase(language === 'en' ? 'en-US' : 'pt-BR');
    }
    return replacement;
  }

  function translatedValue(value) {
    const source = String(value ?? '');
    const trimmed = source.trim();
    if (!trimmed) return null;
    const map = language === 'en' ? translations : reverseTranslations;
    let result = map[trimmed];
    if (!result) {
      const normalized = trimmed.replace(/\s+/g, ' ').toLocaleLowerCase(language === 'en' ? 'pt-BR' : 'en-US');
      result = language === 'en' ? forwardLookup[normalized] : reverseLookup[normalized];
    }
    // Keep leading symbols/emojis while translating the visible label after them.
    if (!result) {
      const prefixMatch = trimmed.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}].*)$/u);
      if (prefixMatch) {
        const tail = prefixMatch[2];
        result = map[tail] || (language === 'en'
          ? forwardLookup[tail.replace(/\s+/g, ' ').toLocaleLowerCase('pt-BR')]
          : reverseLookup[tail.replace(/\s+/g, ' ').toLocaleLowerCase('en-US')]);
        if (result) result = prefixMatch[1] + result;
      }
    }
    if (!result && language === 'en') {
      let countMatch;
      if ((countMatch = trimmed.match(/^Paleta de cores \((\d+\/10)\)$/i))) result = `Color palette (${countMatch[1]})`;
      const colorMatch = trimmed.match(/^Cor (\d+)$/i);
      if (colorMatch) result = `Color ${colorMatch[1]}`;
      const subWorldMatch = trimmed.match(/^Sub-mundo de (.+)$/i);
      if (subWorldMatch) result = `Sub-world of ${subWorldMatch[1]}`;
      let m;
      if ((m = trimmed.match(/^(\d+) espécie\(s\)$/i))) result = `${m[1]} species`;
      else if ((m = trimmed.match(/^Variação de (.+)$/i))) result = `Variation of ${m[1]}`;
      else if ((m = trimmed.match(/^Sub-local · nível (\d+)$/i))) result = `Sub-location · level ${m[1]}`;
      else if ((m = trimmed.match(/^Este ano tem (\d+) dias\. Cada ponto colorido é um evento ou data anual, na cor da sua tag\. Quadradinhos são ciclos de personagens\.$/i))) result = `This year has ${m[1]} days. Each colored dot is an event or annual date, using its tag color. Small squares represent character cycles.`;
      else if ((m = trimmed.match(/^O número ao lado é a quantidade de dias de cada mês\. Ano com (\d+) dias\.$/i))) result = `The number beside each month is its number of days. Year length: ${m[1]} days.`;
      else if ((m = trimmed.match(/^Clique em qualquer ponto da imagem para capturar a cor e preencher a Cor (\d+)\.$/i))) result = `Click anywhere on the image to capture the color and fill in Color ${m[1]}.`;
      else if ((m = trimmed.match(/^Eventos do mundo-pai \((\d+)\)$/i))) result = `Parent-world events (${m[1]})`;
      else if ((m = trimmed.match(/^Este vínculo usa as categorias do tipo “(.+?)” \(valem para todos os vínculos desse tipo\)\.$/i))) result = `This relationship uses the “${m[1]}” type categories (they apply to all relationships of this type).`;
      else if ((m = trimmed.match(/^Habilidade: (.*) ↗$/i))) result = `Skill: ${m[1]} ↗`;
      else if ((m = trimmed.match(/^Item: (.*) ↗$/i))) result = `Item: ${m[1]} ↗`;
      else if ((m = trimmed.match(/^Local: (.*) ↗$/i))) result = `Location: ${m[1]} ↗`;
      const colorLabel = trimmed.match(/^Cor (\d+)$/i);
      if (colorLabel) result = `Color ${colorLabel[1]}`;
    } else if (!result && language === 'pt-BR') {
      let countMatch;
      if ((countMatch = trimmed.match(/^Color palette \((\d+\/10)\)$/i))) result = `Paleta de cores (${countMatch[1]})`;
      const colorMatch = trimmed.match(/^Color (\d+)$/i);
      if (colorMatch) result = `Cor ${colorMatch[1]}`;
      const subWorldMatch = trimmed.match(/^Sub-world of (.+)$/i);
      if (subWorldMatch) result = `Sub-mundo de ${subWorldMatch[1]}`;
      let m;
      if ((m = trimmed.match(/^(\d+) species$/i))) result = `${m[1]} espécie(s)`;
      else if ((m = trimmed.match(/^Variation of (.+)$/i))) result = `Variação de ${m[1]}`;
      else if ((m = trimmed.match(/^Sub-location · level (\d+)$/i))) result = `Sub-local · nível ${m[1]}`;
      else if ((m = trimmed.match(/^This year has (\d+) days\. Each colored dot is an event or annual date, using its tag color\. Small squares represent character cycles\.$/i))) result = `Este ano tem ${m[1]} dias. Cada ponto colorido é um evento ou data anual, na cor da sua tag. Quadradinhos são ciclos de personagens.`;
      else if ((m = trimmed.match(/^The number beside each month is its number of days\. Year length: (\d+) days\.$/i))) result = `O número ao lado é a quantidade de dias de cada mês. Ano com ${m[1]} dias.`;
      else if ((m = trimmed.match(/^Click anywhere on the image to capture the color and fill in Color (\d+)\.$/i))) result = `Clique em qualquer ponto da imagem para capturar a cor e preencher a Cor ${m[1]}.`;
      else if ((m = trimmed.match(/^Parent-world events \((\d+)\)$/i))) result = `Eventos do mundo-pai (${m[1]})`;
      else if ((m = trimmed.match(/^Skill: (.*) ↗$/i))) result = `Habilidade: ${m[1]} ↗`;
      else if ((m = trimmed.match(/^Location: (.*) ↗$/i))) result = `Local: ${m[1]} ↗`;
    }
    return result ? preserveLetterCase(trimmed, result) : null;
  }

  function translateTextNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE || protectedTextNode(node)) return;
    const original = node.nodeValue;
    const replacement = translatedValue(original);
    if (replacement && replacement !== original.trim()) {
      const leading = original.match(/^\s*/)?.[0] || '';
      const trailing = original.match(/\s*$/)?.[0] || '';
      node.nodeValue = leading + replacement + trailing;
    }
  }

  function translateAttributes(el) {
    if (!(el instanceof Element) || protectedAttribute(el)) return;
    // Form values are intentionally excluded; placeholders and accessibility labels are UI copy.
    ['placeholder', 'title', 'aria-label', 'alt', 'data-ph'].forEach((name) => {
      if (!el.hasAttribute(name)) return;
      const original = el.getAttribute(name);
      const replacement = translatedValue(original);
      // Do not re-write identical values: this observer watches attributes.
      if (replacement && replacement !== original) el.setAttribute(name, replacement);
    });
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root !== document) return;
    if (root instanceof Element) translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node);
    if (root.querySelectorAll) root.querySelectorAll('*').forEach(translateAttributes);
  }

  function applyLanguage() {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    translateTree(document.body);
  }

  function setLanguage(value) {
    if (value !== 'en' && value !== 'pt-BR') return;
    language = value;
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) { /* session still works */ }
    try { window.atelier?.setLanguage?.(value); } catch (_) { /* native menu will sync next launch */ }
    applyLanguage();
    try { window.dispatchEvent(new Event('wa:language-changed')); } catch (_) { /* custom event is a best-effort UI refresh */ }
  }

  function makeOverlay(content) {
    const ov = document.createElement('div');
    ov.className = 'dk-ov';
    ov.style.zIndex = '2000';
    ov.innerHTML = `<div class="dk-card">${content}</div>`;
    document.body.append(ov);
    return ov;
  }

  function firstRunPrompt() {
    if (readStoredLanguage()) return;
    const ov = makeOverlay(`
      <h2>World Atelier</h2>
      <p><b>Escolha seu idioma / Choose your language</b></p>
      <p class="dk-mute">Você poderá trocar essa opção depois nas configurações. / You can change this later in Settings.</p>
      <div class="dk-row">
        <button data-language="pt-BR">Português</button>
        <button class="pri" data-language="en">English</button>
      </div>`);
    ov.addEventListener('click', (event) => {
      const button = event.target.closest('[data-language]');
      if (!button) return;
      setLanguage(button.dataset.language);
      ov.remove();
    });
  }

  function languageSettings() {
    const ov = makeOverlay(`
      <h2>Configurações / Settings</h2>
      <h4>Idioma / Language</h4>
      <select id="waLanguageChoice" style="width:100%">
        <option value="pt-BR">Português (Brasil)</option>
        <option value="en">English</option>
      </select>
      <div class="dk-row">
        <button class="pri" data-close-language-settings>Fechar / Close</button>
      </div>`);
    const select = ov.querySelector('#waLanguageChoice');
    select.value = language;
    select.addEventListener('change', () => setLanguage(select.value));
    ov.querySelector('[data-close-language-settings]').addEventListener('click', () => ov.remove());
  }

  function translateMessage(message) {
    const input = String(message ?? '');
    const prefixPairs = language === 'en' ? [
      ['Não foi possível usar essa pasta: ', 'Could not use this folder: '],
      ['Não foi possível concluir a operação: ', 'Could not complete the operation: '],
      ['Não foi possível gerar o backup: ', 'Could not create the backup: '],
      ['Não foi possível salvar na pasta de dados:', 'Could not save to the data folder:'],
      ['Erro: ', 'Error: '],
      ['SVG inválido: ', 'Invalid SVG: '],
      ['Formato de imagem não suportado: ', 'Unsupported image format: ']
    ] : [
      ['Could not use this folder: ', 'Não foi possível usar essa pasta: '],
      ['Could not complete the operation: ', 'Não foi possível concluir a operação: '],
      ['Could not create the backup: ', 'Não foi possível gerar o backup: '],
      ['Could not save to the data folder:', 'Não foi possível salvar na pasta de dados:'],
      ['Error: ', 'Erro: '],
      ['Invalid SVG: ', 'SVG inválido: '],
      ['Unsupported image format: ', 'Formato de imagem não suportado: ']
    ];
    return input.split('\n').map((line) => {
      const direct = translatedValue(line);
      if (direct) return direct;
      for (const [from, to] of prefixPairs) if (line.startsWith(from)) return to + line.slice(from.length);
      let m;
      if (language === 'en') {
        if ((m = line.match(/^O arquivo (.+) está corrompido\.$/))) return `The file ${m[1]} is corrupted.`;
        if ((m = line.match(/^Projeto exportado!$/))) return 'Project exported!';
        if ((m = line.match(/^Projeto importado!$/))) return 'Project imported!';
        if ((m = line.match(/^(\d+) mundo\(s\)(.*)$/))) return `${m[1]} world(s)${m[2]}`.replace('incluindo sub-mundos', 'including sub-worlds');
        if ((m = line.match(/^(\d+) imagem\(ns\)\.$/))) return `${m[1]} image(s).`;
        if ((m = line.match(/^(\d+) mundo\(s\) e (\d+) imagem\(ns\)\.$/))) return `${m[1]} world(s) and ${m[2]} image(s).`;
      } else {
        if ((m = line.match(/^The file (.+) is corrupted\.$/))) return `O arquivo ${m[1]} está corrompido.`;
        if (line === 'Project exported!') return 'Projeto exportado!';
        if (line === 'Project imported!') return 'Projeto importado!';
        if ((m = line.match(/^(\d+) world\(s\)(.*)$/))) return `${m[1]} mundo(s)${m[2]}`.replace('including sub-worlds', 'incluindo sub-mundos');
        if ((m = line.match(/^(\d+) image\(s\)\.$/))) return `${m[1]} imagem(ns).`;
        if ((m = line.match(/^(\d+) world\(s\) and (\d+) image\(s\)\.$/))) return `${m[1]} mundo(s) e ${m[2]} imagem(ns).`;
      }
      return line;
    }).join('\n');
  }

  const nativeAlert = typeof window.alert === 'function' ? window.alert.bind(window) : null;
  const nativeConfirm = typeof window.confirm === 'function' ? window.confirm.bind(window) : null;
  if (nativeAlert) window.alert = (message) => nativeAlert(translateMessage(message));
  if (nativeConfirm) window.confirm = (message) => nativeConfirm(translateMessage(message));

  window.WorldAtelierI18n = Object.freeze({
    getLanguage: () => language,
    setLanguage,
    translate: applyLanguage,
    translateString: translateMessage,
    openLanguageSettings: languageSettings
  });

  if (typeof MutationObserver !== 'undefined' && document.body) {
    observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === 'characterData') translateTextNode(record.target);
        else if (record.type === 'attributes') translateAttributes(record.target);
        else record.addedNodes.forEach(translateTree);
      });
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'title', 'aria-label', 'alt', 'data-ph']
    });
  }

  applyLanguage();
  if (savedLanguage) {
    try { window.atelier?.setLanguage?.(language); } catch (_) { /* native menu will sync next launch */ }
  }
  firstRunPrompt();

  if (!window.atelier) {
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-desk="settings"]')) {
        event.preventDefault();
        languageSettings();
      }
    });
  }
})();
