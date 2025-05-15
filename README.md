# Projeto-Desenvolvimento.

# Biblioteca IMA-Sobre:

O Instituto Mário Alves é uma OSCIP, não partidária e sem fins lucrativos.

É um espaço de construção e formação política, que tem na pluralidade e na justiça social seus valores principais. Ajuda a organizar e se faz presente nas lutas cotidianas em defesa desses valores.

# Objetivo do Sistema:

O sistema é um programa que visa facilitar o funcionamento das bibliotecas tanto para os usuários quanto para os colaboradores.
O programa vai permitir fazer o cadastro, pesquisa e reserva de livros pela internet. Já para retirar e devolver precisa ser presencial.

# Público-Alvo:

No primeiro momento o público-alvo é de universitários, pesquisadores e professores do ensino superior tanto público como privado.

# Usos do Sistema:

* Gerenciamento das Reservas: O Gerenciamento das Reservas oferece aos usuários a possibilidade de reservar livros disponíveis ou entrar em uma fila de espera caso o item esteja emprestado. O sistema automatiza notificações, gerencia prazos para retirada, mantém um histórico de reservas e fornece relatórios administrativos para organização do acervo. Essa funcionalidade otimiza o uso dos recursos e melhora a experiência dos usuários. 

* Gerenciamento das Locações: O Gerenciamento das Locações controla o processo de empréstimo de livros, permitindo registrar e acompanhar itens emprestados e devolvidos. Inclui gerenciamento de prazos, notificações automáticas sobre vencimentos e relatórios administrativos para monitorar as locações. Essa funcionalidade organiza o acervo e garante uma experiência eficiente para os usuários 

* Gerenciamento dos Livros: O Gerenciamento dos Livros engloba o controle completo do acervo, permitindo o cadastro, edição e exclusão de títulos. Inclui organização por categorias, monitoramento da disponibilidade e geração de relatórios para análise do acervo. Essa funcionalidade garante um acervo bem estruturado e acessível para os usuários.

* Gerenciamento dos Clientes: O Gerenciamento dos Clientes permite o controle eficaz de informações dos usuários, como cadastro, histórico de empréstimos e status de reservas. Inclui funcionalidades para atualização de dados, monitoramento de atividades e geração de relatórios, promovendo uma interação personalizada e organizada com os clientes.

* Perfis de Usuários: O Perfis de Usuários define diferentes níveis de acesso ao sistema, como administradores e clientes. Cada perfil possui permissões específicas, garantindo segurança e organização. Essa funcionalidade personaliza a experiência dos usuários e protege as operações do sistema. 

# Monetização:

A monetização de uma biblioteca de livros pode ser realizada através de estratégias como a cobrança de assinaturas mensais ou anuais para acesso ao acervo completo, taxas por empréstimos específicos de livros físicos ou digitais, e parcerias com editoras para vender obras diretamente na plataforma. Além disso, serviços adicionais, como eventos literários, workshops e espaços de coworking, também podem gerar receita, enquanto programas de doação ou patrocínio promovem sustentabilidade financeira.

# Pessoas:

Paulo é estudante de graduação, tem 23 anos. Com aulas nos dois turnos e tem uma rotina bem dinâmica.  

Betânia é professora a 15 nos, hoje com 40 anos ela busca sempre se atualizar através de cursos e muita leitura.

Flora é pesquisadora na área da educação, tem 50 anos e busca sempre muita informação na leitura física e virtual para realizar suas pesquisas. 

# Requisitos do Sistema:

* Requisitos Funcionais:

RF:001- Cadastro e Login de Usuários:

RN= Permitir o registro de novos usuários (incluindo dados pessoais, como nome, e-mail, senha, endereço e se é ADM ou não).

Sistema de autenticação para login e recuperação de senha.

RF:002- Busca e Visualização de Livros:

RN= Permitir a pesquisa de livros por título, autor, gênero ou palavras-chave.

Exibir detalhes dos livros (título, autor, descrição, disponibilidade e capa).

RF:003- Sistema de Empréstimo:

RN= Permitir que usuários reservem livros físicos ou renovção.

Limitar a quantidade de livros que podem ser emprestados por usuário.

Controle de prazos de devolução e notificação de atraso.

RF:004- Sistema de Gerenciamento de Livros:

RN= Permitir que administradores adicionem, editem ou removam livros do acervo.

Controle do estoque e atualizações de disponibilidade dos livros.

RF:005- Notificações:

RN= Enviar lembretes de devolução de livros.

Notificar usuários sobre a chegada de novos títulos ou promoções.

RF:006- Relatórios e Estatísticas:

RN= Gerar relatórios sobre os livros mais emprestados, usuários ativos e empréstimos pendentes.

Monitorar o desempenho da biblioteca.

RF:007- Espaço de Avaliações e Recomendações:

RN= Permitir que usuários avaliem e deixem comentários sobre os livros.

Sistema de recomendação baseado no histórico de leituras do usuário.

* Requisitos Não Funcionais:

RF:001- Segurança dos dados e informações: 

RN= Proteção das informações dos usuários e do acervo contra acessos não autorizados, utilizando criptografia e autenticação robusta.

RF:002- Sistema de recuperação de dados: 

RN= Implementação de backups automáticos e regulares, permitindo a restauração de dados em caso de falhas ou perdas.

RF:003- Interface intuitiva e de fácil acesso: 

RN= Design responsivo e amigável que facilita a navegação e uso do sistema, independentemente do dispositivo utilizado.

RF:004- Sistema escalável: 

RN= Capacidade de suportar um número crescente de usuários e volumes de dados sem comprometer o desempenho.

RF:005- Documentação atualizada: 

RN= Manuais técnicos e guias do sistema sempre atualizados, facilitando a manutenção e expansão futura.

# Diagrama de Casos de Uso:

# Diagrama de Classes:

# Tecnologias:

React.js: Utilizado para desenvolvimento de frontend, fornece uma experiência eficiente com renderização no servidor e funcionalidades como roteamento.

Express.js: Framework para backend com Node.js, ideal para criar APIs RESTful e aplicativos web escaláveis, oferecendo suporte robusto para roteamento e middleware.

Node.js: Ambiente de execução para JavaScript no servidor, que facilita o desenvolvimento backend e integração com diversas bases de dados.

Bruno: Banco de dados NoSQL, ideal para armazenar e gerenciar dados não estruturados e de forma flexível.

JWT (JSON Web Token): Utilizado para autenticação segura, garantindo que apenas usuários autorizados tenham acesso a recursos protegidos da aplicação.

# Bibliotecas do Projeto (Backend):

Validador Expresso
Cors
Token da web JSON
Bcryptjs
Next

# Bibliotecas do Projeto (Fronend):

Roteador React DOM
Contexto React e AuthProvider
Reagir Redux
Reagir Modal
Calendário Completo
Reagir Toastify

# Histórias de Usuários:

1ª  Sendo um estudante com os horário corridos.
    Posso renovar meus livros pelo sistema.
    Para que eu não precise ir até a biblioteca.

2ª  Sendo uma professora com muitas aulas.
    Posso reservar os livros online.
    Para que eu possa aproveitar o tempo  livre  para preparar as aulas.

3ª  Sendo uma pesquisadora que faz muitas  buscas online.
    Posso pesquisar títulos pela internet.
    Para que otimizar meu trabalho podendo  pesquisar de outras cidades.

# Interfaces de Usuário:

Para a biblioteca IMA, as telas foram criadas com base em um processo metodológico que prioriza a usabilidade e a estética, garantindo uma experiência de navegação tranquila e eficiente. Todas as telas mencionadas podem ser visualizadas no Figma, detalhando o seguinte:

A definição da identidade visual foi o ponto de partida. A escolha cuidadosa das cores e logotipos visou transmitir calma, profissionalismo e modernidade, elementos essenciais para um ambiente dedicado à educação e cultura. A paleta de tons foi selecionada para proporcionar um design limpo, contemporâneo e acessível.

A página inicial foi planejada para apresentar as principais funcionalidades da biblioteca IMA de maneira clara e objetiva. Isso inclui:

Descrição do propósito da biblioteca.

Público-alvo e benefícios oferecidos.

Informações sobre a disponibilização de livros físicos.

Além disso, foram desenvolvidas telas cruciais, como:

Login e Cadastro de Usuários: Para garantir uma entrada segura e personalização da experiência.

Recuperação de Senha: Facilita o acesso em caso de problemas.

Processo de Reserva e renovação: Interface simples para gerenciar a disponibilidade dos livros.

Cada elemento foi criado visando atender aos padrões de design, reforçando a consistência e o alinhamento entre as telas. Esses esforços asseguram que o sistema da biblioteca IMA não apenas funcione bem, mas também ofereça uma experiência visual e interativa memorável.

# Sistemas Semelhantes e Comparação:

1. Biblioteca da UFPel (Universidade Federal de Pelotas)
Descrição:

A UFPel possui um Sistema de Bibliotecas (SisBi), que integra diversas bibliotecas espalhadas pelos campi da universidade.

Oferece um acervo físico e digital abrangente, incluindo livros, periódicos, teses e dissertações.

Suporte a pesquisas acadêmicas com acesso a bases de dados científicas e ferramentas de normalização de trabalhos acadêmicos.

Serviços como empréstimos, renovações e reservas podem ser realizados online.

A biblioteca também promove eventos e treinamentos para capacitar os usuários no uso de recursos bibliográficos.

Diferenciais:

Acesso a bases de dados internacionais e periódicos CAPES.

Diversidade de bibliotecas especializadas, como a de Ciências Sociais e Odontologia.

Atendimento presencial e remoto para suporte acadêmico.

2. Biblioteca da UCPel (Universidade Católica de Pelotas)
Descrição:

A biblioteca da UCPel, chamada Biblioteca Monsenhor Malomar Lund Edelweiss, é centralizada e atende a comunidade acadêmica com um acervo físico e digital.

Conta com mais de 110 mil exemplares físicos e um acervo virtual acessível via plataforma Minha UCPel.

Oferece cabines de estudo individual e em grupo, além de acesso à internet e zonas Wi-Fi.

Serviços incluem empréstimos, renovações e consulta ao catálogo online.

Disponibiliza periódicos acadêmicos organizados por áreas de conhecimento.

Diferenciais:

Espaços modernos e equipados para estudo colaborativo.

Foco em atender as necessidades específicas dos cursos de graduação e pós-graduação da UCPel.

Produção acadêmica (teses e dissertações) disponível para consulta.

# Comparação:

![comparação](https://github.com/user-attachments/assets/ea55828e-d8e4-45ba-ab16-4ee8ffd143d1))

Nosso diferencial será a criação de uma experiência personalizada e acessível para os usuários, indo além do simples empréstimo de livros. Vamos combinar tecnologia, design e serviços exclusivos para transformar a interação dos usuários com a biblioteca. Aqui estão os principais pontos que nos destacam:

Interface Intuitiva e Amigável: Um sistema que prioriza a simplicidade e facilidade de uso, garantindo que qualquer pessoa, independentemente do nível de habilidade tecnológica, consiga navegar e acessar recursos rapidamente.

Acesso Multicanal: Ofereceremos suporte a dispositivos móveis, tablets e desktops, garantindo que os usuários possam explorar o acervo de qualquer lugar, a qualquer hora.

Acervo Híbrido (Físico e Digital): Combinação de um acervo físico robusto e uma vasta coleção digital (e-books, audiobooks, periódicos), atendendo tanto quem prefere o toque dos livros quanto os adeptos da leitura digital.

Recomendações Personalizadas: Uso de inteligência artificial para sugerir livros, autores e temas baseados no histórico e nos interesses de cada usuário.

Espaços e Eventos: Criação de áreas colaborativas para estudo e troca de ideias, além de promover eventos culturais, como clubes do livro, workshops e palestras com autores.

Acompanhamento e Engajamento: Sistemas de notificações para lembrar prazos, indicar novos lançamentos ou promover atividades, mantendo o usuário sempre conectado à biblioteca.

Sustentabilidade e Inclusão: Investimento em práticas sustentáveis e acessibilidade, garantindo que nosso espaço e sistema atendam a todos, incluindo pessoas com deficiência.

Nosso objetivo é não apenas oferecer livros, mas criar um centro de aprendizado, cultura e inovação, tornando a biblioteca um local essencial e inspirador para a comunidade.

