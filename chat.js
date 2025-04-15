// Chat Widget Script
(function() {
    // Variables de texto para traducción
    const TEXTOS = {
        iniciarChat: "Iniciar Chat",
        whatsapp: "WhatsApp",
        correo: "Correo electrónico",
        llamada: "Llamar por teléfono",
        escribirMensaje: "Escribe tu mensaje aqui...",
        atencionCliente: "Atención al Cliente",
        error: "Error:",
        hola: "Hola 👋, ¿Cómo podemos ayudarte?",
        emojis: "Emojis",
        noDisponible: "Lo sentimos, en este momento no podemos atender por chat. Por favor, intenta más tarde o utiliza otro canal de comunicación."
    };

    // Default configuration
    const defaultConfig = {
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: '',
                link: '#'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333',
            animation: 'fadeInScale',
            animationDuration: '0.5s',
            animationDelay: '0s',
            darkMode: {
                enabled: false
            }
        },
        contact: {
            chat: {
                enabled: true,
                webhook: {
                    url: '',
                    route: ''
                }
            },
            whatsapp: {
                enabled: false,
                number: ''
            },
            email: {
                enabled: false,
                address: ''
            },
            phone: {
                enabled: false,
                number: ''
            }
        }
    };

    // Merge user config with defaults
    const config = window.ChatConfig ? {
        branding: { ...defaultConfig.branding, ...window.ChatConfig.branding },
        style: { ...defaultConfig.style, ...window.ChatConfig.style },
        contact: { 
            chat: { 
                enabled: window.ChatConfig.contact?.chat?.enabled ?? defaultConfig.contact.chat.enabled,
                webhook: { 
                    ...defaultConfig.contact.chat.webhook, 
                    ...window.ChatConfig.contact?.chat?.webhook 
                }
            },
            whatsapp: { ...defaultConfig.contact.whatsapp, ...window.ChatConfig.contact?.whatsapp },
            email: { ...defaultConfig.contact.email, ...window.ChatConfig.contact?.email },
            phone: { ...defaultConfig.contact.phone, ...window.ChatConfig.contact?.phone }
        }
    } : defaultConfig;

    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget.dark-mode {
            --chat--color-primary: #a67fff;
            --chat--color-secondary: #8b5fe6;
            --chat--color-background: #1a1a1a;
            --chat--color-font: #ffffff;
        }

        .n8n-chat-widget.dark-mode .chat-container {
            background-color: #1a1a1a;
            border-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .brand-header {
            border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-message.bot {
            background-color: #2a2a2a;
            color: #ffffff;
        }

        .n8n-chat-widget.dark-mode .chat-input {
            background-color: #1a1a1a;
            border-top-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-input textarea {
            background-color: #2a2a2a;
            color: #ffffff;
            border-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .n8n-chat-widget.dark-mode .theme-toggle {
            color: #ffffff;
        }

        /* Estilos para la barra de scroll en modo oscuro */
        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-track {
            background: #1a1a1a;
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-thumb:hover {
            background: #444;
        }

        /* Estilos para la barra de scroll en modo claro */
        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: #f0f0f0;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: #999;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: translateY(20px);
            visibility: hidden;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s, box-shadow 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(133, 79, 255, 0.4);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            border-radius: 16px;
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
        }

        .n8n-chat-widget .chat-loader {
            display: none;
            align-self: flex-start;
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-loader.active {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .n8n-chat-widget .chat-loader-dots {
            display: flex;
            gap: 4px;
        }

        .n8n-chat-widget .chat-loader-dot {
            width: 8px;
            height: 8px;
            background: var(--chat--color-primary);
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }

        .n8n-chat-widget .chat-loader-dot:nth-child(1) { animation-delay: -0.32s; }
        .n8n-chat-widget .chat-loader-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input-buttons {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 12px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: none;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            border-color: var(--chat--color-primary);
            box-shadow: 0 2px 8px rgba(133, 79, 255, 0.15);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .emoji-button {
            background: none;
            color: var(--chat--color-primary);
            border: none;
            border-radius: 12px;
            padding: 0;
            cursor: pointer;
            transition: transform 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
        }

        .n8n-chat-widget .emoji-button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-input button {
            background: none;
            color: var(--chat--color-primary);
            border: none;
            border-radius: 12px;
            padding: 0;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            font-family: inherit;
            font-weight: 500;
            box-shadow: none;
            display: none;
        }

        .n8n-chat-widget .send-icon {
            width: 24px;
            height: 24px;
            fill: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            animation: var(--chat-toggle-animation) var(--chat-toggle-animation-duration) var(--chat-toggle-animation-delay) ease-out forwards;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        @keyframes fadeInScale {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes slideInRight {
            0% {
                opacity: 0;
                transform: translateX(100px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInLeft {
            0% {
                opacity: 0;
                transform: translateX(-100px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 0.9;
                transform: scale(1.1);
            }
            80% {
                opacity: 1;
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes rotateIn {
            0% {
                opacity: 0;
                transform: rotate(-180deg) scale(0.3);
            }
            100% {
                opacity: 1;
                transform: rotate(0) scale(1);
            }
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container {
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                border-radius: 0;
            }

            .n8n-chat-widget .chat-toggle {
                bottom: 10px;
                right: 10px;
                width: 50px;
                height: 50px;
            }
            
            .n8n-chat-widget .emoji-button {
                display: none !important; /* Ocultar botón de emojis en dispositivos móviles */
            }
        }

        .n8n-chat-widget .emoji-panel {
            position: absolute;
            bottom: 80px;
            left: 0;
            right: 0;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 0;
            display: none;
            flex-direction: column;
            width: 100%;
            max-height: 300px;
            z-index: 1001;
            transform-origin: bottom center;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            transform: translateY(20px) scale(0.95);
            opacity: 0;
        }

        .n8n-chat-widget .emoji-panel.active {
            display: flex;
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        @keyframes emojiPanelIn {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes emojiPanelOut {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
        }

        .n8n-chat-widget .emoji-panel.active {
            display: flex;
            animation: emojiPanelIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .n8n-chat-widget .emoji-panel.closing {
            display: flex;
            animation: emojiPanelOut 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .n8n-chat-widget .emoji-content {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
            gap: 4px;
            padding: 12px;
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 220px;
            order: 1;
        }

        .n8n-chat-widget .emoji-categories {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            padding: 8px;
            background: rgba(133, 79, 255, 0.05);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            border-radius: 0 0 12px 12px;
            position: sticky;
            bottom: 0;
            z-index: 2;
            order: 2;
            justify-content: center;
            overflow-x: hidden;
        }

        .n8n-chat-widget .emoji-category {
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            transition: all 0.2s;
            font-size: 16px;
        }

        .n8n-chat-widget .emoji-category:hover {
            background-color: rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .emoji-category.active {
            background-color: rgba(133, 79, 255, 0.2);
            transform: scale(1.1);
        }

        .n8n-chat-widget .emoji-item {
            cursor: pointer;
            font-size: 18px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: background-color 0.2s;
            padding: 4px;
            min-width: 32px;
            min-height: 32px;
        }

        .n8n-chat-widget .emoji-item:hover {
            background-color: rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar-thumb {
            background: rgba(133, 79, 255, 0.2);
            border-radius: 3px;
        }

        .n8n-chat-widget .contact-buttons-row {
            display: flex;
            gap: 8px;
            margin-top: 12px;
            justify-content: center;
        }

        .n8n-chat-widget .contact-button {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            border: none;
            color: white;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget .contact-button:hover {
            transform: translateY(-2px);
        }

        .n8n-chat-widget .contact-button.whatsapp {
            background: #128C7E;
        }

        .n8n-chat-widget .contact-button.email {
            background: #D44638;
        }

        .n8n-chat-widget .contact-button.phone {
            background: #4CAF50;
        }

        .n8n-chat-widget .contact-button svg {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .theme-toggle {
            position: absolute;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 20px;
            opacity: 0.8;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            z-index: 1001;
        }

        .n8n-chat-widget .theme-toggle:hover {
            opacity: 1;
            background: rgba(133, 79, 255, 0.1);
            transform: translateY(-50%) scale(1.1);
        }

        .n8n-chat-widget .theme-icon {
            width: 20px;
            height: 20px;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget.dark-mode .theme-icon {
            fill: #ffffff;
        }

        .n8n-chat-widget .theme-toggle:hover .theme-icon {
            transform: rotate(180deg);
        }

        .n8n-chat-widget .theme-icon.light {
            display: block;
        }

        .n8n-chat-widget .theme-icon.dark {
            display: none;
        }

        .n8n-chat-widget.dark-mode .theme-icon.light {
            display: none;
        }

        .n8n-chat-widget.dark-mode .theme-icon.dark {
            display: block;
        }

        .n8n-chat-widget .resize-button {
            position: absolute;
            right: 90px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: nwse-resize;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 20px;
            opacity: 0.8;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            z-index: 1001;
        }

        .n8n-chat-widget .resize-button:hover {
            opacity: 1;
            background: rgba(133, 79, 255, 0.1);
            transform: translateY(-50%) scale(1.1);
        }

        .n8n-chat-widget .resize-button svg {
            width: 16px;
            height: 16px;
        }

        .n8n-chat-widget.dark-mode .resize-button {
            color: #ffffff;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .resize-button {
                display: none;
            }
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-track {
            background: #2a2a2a;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 4px;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-track {
            background: #f0f0f0;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-thumb:hover {
            background: #999;
        }
    `;

    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Funciones principales
    function generateUUID() {
        return crypto.randomUUID();
    }

    function startNewConversation() {
        currentSessionId = generateUUID();
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.contact.chat.webhook.route,
            metadata: {
                userId: ""
            }
        }];

        // Aplicar clase de animación de salida a los elementos a ocultar
        const brandHeader = chatContainer.querySelector('.brand-header');
        const newConversation = chatContainer.querySelector('.new-conversation');
        
        brandHeader.classList.add('fade-out');
        newConversation.classList.add('fade-out');
        
        // Mostrar la interfaz del chat con animación de entrada
        setTimeout(() => {
            brandHeader.style.display = 'none';
            newConversation.style.display = 'none';
            
            chatInterface.classList.add('fade-in');
            chatInterface.classList.add('active');
            
            // Continuar con el resto del código de inicio de conversación
            fetch(config.contact.chat.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(responseData => {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';
                botMessageDiv.innerHTML = `
                    <div style="display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                        <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
                    </div>
                    <span>${Array.isArray(responseData) ? responseData[0].output : responseData.output}</span>
                    <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                        <span>${new Date().toLocaleDateString([], { year: '2-digit', month: '2-digit', day: '2-digit' })} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                `;
                messagesContainer.appendChild(botMessageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            })
            .catch(error => {
                console.error('Error:', error);
                const errorMessageDiv = document.createElement('div');
                errorMessageDiv.className = 'chat-message bot';
                errorMessageDiv.innerHTML = `
                    <div style="display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                        <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
                    </div>
                    <span>${TEXTOS.noDisponible}</span>
                    <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                        <span>${new Date().toLocaleDateString([], { year: '2-digit', month: '2-digit', day: '2-digit' })} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                `;
                messagesContainer.appendChild(errorMessageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
        }, 300); // Tiempo corto para que se vea la animación
    }

    // Generar HTML para los botones de contacto basado en la configuración
    function generateContactButtonsHTML() {
        let mainButtonHTML = '';
        let contactButtonsHTML = '';
        
        // Botón de chat (si está habilitado)
        if (config.contact.chat.enabled) {
            mainButtonHTML = `
            <button class="new-chat-btn chat-button">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                ${TEXTOS.iniciarChat}
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>`;
        }
        
        // Fila de botones de contacto secundarios
        contactButtonsHTML = '<div class="contact-buttons-row">';
        
        // Botón de WhatsApp (si está habilitado y hay número)
        if (config.contact.whatsapp.enabled && config.contact.whatsapp.number) {
            contactButtonsHTML += `
            <button class="contact-button whatsapp" onclick="window.open('https://wa.me/${config.contact.whatsapp.number}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
            </button>`;
        }
        
        // Botón de email (si está habilitado y hay dirección)
        if (config.contact.email.enabled && config.contact.email.address) {
            contactButtonsHTML += `
            <button class="contact-button email" onclick="window.open('mailto:${config.contact.email.address}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
            </button>`;
        }
        
        // Botón de teléfono (si está habilitado y hay número)
        if (config.contact.phone.enabled && config.contact.phone.number) {
            contactButtonsHTML += `
            <button class="contact-button phone" onclick="window.open('tel:${config.contact.phone.number}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                </svg>
            </button>`;
        }
        
        contactButtonsHTML += '</div>';
        
        // Solo devolver la fila de botones si hay al menos un botón de contacto
        const hasContactButtons = config.contact.whatsapp.enabled || config.contact.email.enabled || config.contact.phone.enabled;
        
        return mainButtonHTML + (hasContactButtons ? contactButtonsHTML : '');
    }

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Configurar las variables CSS
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);
    widgetContainer.style.setProperty('--chat-toggle-animation', config.style.animation);
    widgetContainer.style.setProperty('--chat-toggle-animation-duration', config.style.animationDuration);
    widgetContainer.style.setProperty('--chat-toggle-animation-delay', config.style.animationDelay);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    const newConversationHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="theme-toggle" title="Cambiar tema">
                <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                </button>
                <button class="resize-button" title="Redimensionar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
                    </svg>
                </button>
                <button class="close-button">&times;</button>
            </div>
            <div class="new-conversation">
                <h2 class="welcome-text">${TEXTOS.hola}</h2>
                ${generateContactButtonsHTML()}
            </div>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="theme-toggle" title="Cambiar tema">
                    <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                </button>
                <button class="resize-button" title="Redimensionar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
                    </svg>
                </button>
                <button class="close-button">&times;</button>
            </div>
            <div class="chat-messages">
                <div class="chat-loader">
                    <div class="chat-loader-dots">
                        <div class="chat-loader-dot"></div>
                        <div class="chat-loader-dot"></div>
                        <div class="chat-loader-dot"></div>
                    </div>
                </div>
            </div>
            <div class="emoji-panel">
                <div class="emoji-categories">
                    <div class="emoji-category active" data-category="frequent">😀</div>
                    <div class="emoji-category" data-category="smileys">😊</div>
                    <div class="emoji-category" data-category="people">👍</div>
                    <div class="emoji-category" data-category="animals">🐱</div>
                    <div class="emoji-category" data-category="food">🍔</div>
                    <div class="emoji-category" data-category="travel">✈️</div>
                    <div class="emoji-category" data-category="activities">⚽</div>
                    <div class="emoji-category" data-category="objects">💡</div>
                    <div class="emoji-category" data-category="symbols">❤️</div>
                    <div class="emoji-category" data-category="flags">🏁</div>
                </div>
                <div class="emoji-content"></div>
            </div>
            <div class="chat-input">
                <div class="chat-input-buttons">
                    <button type="button" class="emoji-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="send-icon">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7zm9-2c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-8 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
                        </svg>
                    </button>
                </div>
                <textarea placeholder="${TEXTOS.escribirMensaje}" rows="1"></textarea>
                <div class="chat-input-buttons">
                    <button type="submit" class="send-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="send-icon">
                            <path fill="currentColor" d="M2.01 21l20.99-9L2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    // Ahora que el DOM está listo, podemos acceder a los elementos
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');
    const emojiButton = chatContainer.querySelector('.emoji-button');
    const emojiPanel = chatContainer.querySelector('.emoji-panel');
    const emojiCategories = chatContainer.querySelectorAll('.emoji-category');
    const emojiContent = chatContainer.querySelector('.emoji-content');
    const closeButtons = chatContainer.querySelectorAll('.close-button');

    // Configurar el evento para los botones de cerrar
    closeButtons.forEach(button => {
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
        `;
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
            setTimeout(() => {
                chatContainer.style.visibility = 'hidden';
            }, 500);
        });
    });

    // Configurar el botón de chat - AQUÍ ESTÁ EL CAMBIO PRINCIPAL
    if (config.contact.chat.enabled) {
        const chatButton = chatContainer.querySelector('.chat-button');
        if (chatButton) {
            chatButton.addEventListener('click', startNewConversation);
        }
    }

    // Configurar el botón de alternar chat
    toggleButton.addEventListener('click', () => {
        if (chatContainer.classList.contains('open')) {
            chatContainer.classList.remove('open');
            setTimeout(() => {
                chatContainer.style.visibility = 'hidden';
            }, 500); // Espera a que la transición termine
        } else {
            chatContainer.style.visibility = 'visible';
            chatContainer.classList.add('open');
        }
    });

    // Configurar el botón de enviar
    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
        }
    });
    
    // Configurar el manejo de presionar Enter en el textarea
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
            }
        }
    });

    // Configurar la entrada de texto
    textarea.addEventListener('input', () => {
        if (textarea.value.trim()) {
            sendButton.style.display = 'block';
            emojiButton.style.display = 'flex';
        } else {
            sendButton.style.display = 'none';
            emojiButton.style.display = 'none';
        }
    });

    // Definir los emojis por categoría
    const emojisByCategory = {
        frequent: ['😀', '😊', '👍', '❤️', '👋', '🙏', '😂', '🎉', '👏', '🤔', '😍'],
        smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
        people: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️'],
        animals: ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗'],
        food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊'],
        travel: ['✈️', '🚀', '🚁', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚌', '🚍', '🚎', '🚐', '🚑', '🚒', '🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚙', '🚚', '🚛', '🚜', '🏎️', '🏍️', '🛵', '🦽', '🦼', '🛺', '🚲', '🛴', '🛹', '🚏', '🛣️', '🛤️', '🛢️', '⛽', '🚨', '🚥', '🚦', '🛑', '🚧'],
        activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🪁', '🎣', '🤿', '🎽', '🎿', '🛷', '🥌', '🎯', '🪂', '🎮', '🕹️', '🎲', '🎭', '🎨', '🧩'],
        objects: ['💡', '🔦', '🕯️', '🧯', '🛒', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '💊', '💉', '🩸', '🩹', '🩺', '🔪', '🗡️', '⚔️', '🛡️', '🚪', '🪑', '🛏️', '🛋️', '🪒', '🧴', '🧷', '🧹', '🧺', '🧻', '🧼', '🧽', '🧯', '🛒'],
        symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️'],
        flags: ['🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏴‍☠️']
    };

    // Función para cargar emojis de una categoría
    function loadEmojisForCategory(category) {
        emojiContent.innerHTML = '';
        const emojis = emojisByCategory[category];
        
        emojis.forEach(emoji => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'emoji-item';
            emojiElement.textContent = emoji;
            emojiElement.addEventListener('click', () => {
                insertEmoji(emoji);
            });
            emojiContent.appendChild(emojiElement);
        });
    }

    // Función para insertar emoji en el textarea
    function insertEmoji(emoji) {
        const cursorPos = textarea.selectionStart;
        const textBefore = textarea.value.substring(0, cursorPos);
        const textAfter = textarea.value.substring(cursorPos);
        
        textarea.value = textBefore + emoji + textAfter;
        
        // Mover el cursor después del emoji insertado
        textarea.selectionStart = cursorPos + emoji.length;
        textarea.selectionEnd = cursorPos + emoji.length;
        textarea.focus();
        
        // Mostrar el botón de enviar
        sendButton.style.display = 'block';
        
        // Cerrar el panel de emojis después de seleccionar uno
        emojiPanel.classList.remove('active');
    }

    // Cargar emojis frecuentes por defecto
    loadEmojisForCategory('frequent');

    // Manejar cambios de categoría
    emojiCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Quitar clase activa de todas las categorías
            emojiCategories.forEach(cat => cat.classList.remove('active'));
            // Añadir clase activa a la categoría seleccionada
            category.classList.add('active');
            // Cargar emojis de la categoría seleccionada
            loadEmojisForCategory(category.dataset.category);
        });
    });

    // Función para manejar el clic en el botón de emojis
    emojiButton.addEventListener('click', () => {
        // Alternar la visibilidad del panel de emojis
        emojiPanel.classList.toggle('active');
        
        // Si el panel está visible, cargar los emojis frecuentes
        if (emojiPanel.classList.contains('active')) {
            loadEmojisForCategory('frequent');
        }
    });

    // Cerrar el panel de emojis al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        if (!emojiPanel.contains(event.target) && !emojiButton.contains(event.target)) {
            emojiPanel.classList.remove('active');
        }
    });

    // Función para manejar el redimensionamiento
    function initializeResize() {
        const resizeButtons = document.querySelectorAll('.resize-button');
        const chatContainer = document.querySelector('.chat-container');
        
        if (!resizeButtons.length || !chatContainer) return;
        
        // Tamaños predefinidos
        const normalSize = {
            width: '380px',
            height: '600px'
        };
        
        const largeSize = {
            width: '600px',
            height: '800px'
        };
        
        let isLarge = false;

        function getMaxSize() {
            // Obtener el tamaño de la ventana
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Calcular el tamaño máximo permitido (80% del tamaño de la ventana)
            const maxWidth = Math.floor(windowWidth * 0.8);
            const maxHeight = Math.floor(windowHeight * 0.8);
            
            return {
                width: maxWidth,
                height: maxHeight
            };
        }

        function toggleSize() {
            // Verificar si estamos en un dispositivo móvil
            if (window.innerWidth <= 768) {
                return; // No permitir redimensionamiento en móviles
            }

            const maxSize = getMaxSize();
            
            if (isLarge) {
                chatContainer.style.width = normalSize.width;
                chatContainer.style.height = normalSize.height;
            } else {
                // Ajustar el tamaño grande para que no exceda el máximo
                const width = Math.min(parseInt(largeSize.width), maxSize.width);
                const height = Math.min(parseInt(largeSize.height), maxSize.height);
                
                chatContainer.style.width = width + 'px';
                chatContainer.style.height = height + 'px';
            }
            isLarge = !isLarge;
            
            // Actualizar el icono de todos los botones
            resizeButtons.forEach(button => {
                const icon = button.querySelector('svg');
                icon.innerHTML = '<path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>';
            });
        }

        // Añadir listener para cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                // Restaurar tamaño normal en móviles
                chatContainer.style.width = '100%';
                chatContainer.style.height = '100%';
                isLarge = false;
            } else if (isLarge) {
                // Ajustar el tamaño grande si es necesario
                const maxSize = getMaxSize();
                const width = Math.min(parseInt(largeSize.width), maxSize.width);
                const height = Math.min(parseInt(largeSize.height), maxSize.height);
                
                chatContainer.style.width = width + 'px';
                chatContainer.style.height = height + 'px';
            } else {
                // Mantener el tamaño normal
                chatContainer.style.width = normalSize.width;
                chatContainer.style.height = normalSize.height;
            }
        });

        // Añadir el evento a todos los botones de redimensionamiento
        resizeButtons.forEach(button => {
            button.addEventListener('click', toggleSize);
        });
    }

    // Inicializar el redimensionamiento después de crear el widget
    initializeResize();

    // Reinicializar el redimensionamiento cuando se inicia una nueva conversación
    const chatButton = chatContainer.querySelector('.chat-button');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            setTimeout(initializeResize, 100);
        });
    }

    // Función para enviar mensajes
    async function sendMessage(message) {
        const messagesContainer = chatContainer.querySelector('.chat-messages');
        const messageData = {
            message: message,
            timestamp: new Date().toISOString()
        };

        // Añadir mensaje del usuario
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.innerHTML = `
            <span>${message}</span>
            <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                <span>${new Date().toLocaleDateString([], { year: '2-digit', month: '2-digit', day: '2-digit' })} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Añadir loader
        const loader = document.createElement('div');
        loader.className = 'chat-message bot';
        loader.innerHTML = `
            <div style="display: flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
            </div>
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        messagesContainer.appendChild(loader);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.contact.chat.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            const data = await response.json();
            
            // Eliminar loader
            loader.remove();
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                    </svg>
                    <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
                </div>
                <span>${Array.isArray(data) ? data[0].output : data.output}</span>
                <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                    <span>${new Date().toLocaleDateString([], { year: '2-digit', month: '2-digit', day: '2-digit' })} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            `;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            // Eliminar loader en caso de error
            loader.remove();
            console.error('Error:', error);
            
            // Añadir mensaje de error al usuario
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'chat-message bot';
            errorMessageDiv.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                    </svg>
                    <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
                </div>
                <span>${TEXTOS.noDisponible}</span>
                <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                    <span>${new Date().toLocaleDateString([], { year: '2-digit', month: '2-digit', day: '2-digit' })} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            `;
            messagesContainer.appendChild(errorMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Función para inicializar el modo oscuro
    function initializeDarkMode() {
        const darkModeConfig = config.style.darkMode;
        if (darkModeConfig && darkModeConfig.enabled) {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const themeToggles = chatContainer.querySelectorAll('.theme-toggle');
            const chatWidget = document.querySelector('.n8n-chat-widget');
            
            function updateDarkMode(isDark) {
                if (isDark) {
                    chatWidget.classList.add('dark-mode');
                    localStorage.setItem('chatTheme', 'dark');
                } else {
                    chatWidget.classList.remove('dark-mode');
                    localStorage.setItem('chatTheme', 'light');
                }
            }

            // Escuchar cambios en la preferencia del sistema
            darkModeMediaQuery.addListener((e) => {
                if (!localStorage.getItem('chatTheme')) {
                    updateDarkMode(e.matches);
                }
            });
            
            // Manejar el clic en los botones de tema
            themeToggles.forEach(toggle => {
                toggle.innerHTML = `
                    <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                `;
                toggle.addEventListener('click', () => {
                    const isDark = chatWidget.classList.contains('dark-mode');
                    updateDarkMode(!isDark);
                });
            });

            // Aplicar el tema guardado o el del sistema
            const savedTheme = localStorage.getItem('chatTheme');
            if (savedTheme) {
                updateDarkMode(savedTheme === 'dark');
            } else {
                updateDarkMode(darkModeMediaQuery.matches);
            }
        }
    }

    // Inicializar el modo oscuro después de crear el widget
    initializeDarkMode();

})();   

// Inicializar el chat cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (window.ChatWidgetConfig) {
        // Crear el widget
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'n8n-chat-widget';
        
        // Configurar las variables CSS
        widgetContainer.style.setProperty('--n8n-chat-primary-color', window.ChatWidgetConfig.style.primaryColor);
        widgetContainer.style.setProperty('--n8n-chat-secondary-color', window.ChatWidgetConfig.style.secondaryColor);
        widgetContainer.style.setProperty('--n8n-chat-background-color', window.ChatWidgetConfig.style.backgroundColor);
        widgetContainer.style.setProperty('--n8n-chat-font-color', window.ChatWidgetConfig.style.fontColor);
        widgetContainer.style.setProperty('--chat-toggle-animation', window.ChatWidgetConfig.style.animation);
        widgetContainer.style.setProperty('--chat-toggle-animation-duration', window.ChatWidgetConfig.style.animationDuration);
        widgetContainer.style.setProperty('--chat-toggle-animation-delay', window.ChatWidgetConfig.style.animationDelay);

        // Añadir el widget al body
        document.body.appendChild(widgetContainer);
        
        // Inicializar el chat
        window.ChatWidget = new ChatWidget(window.ChatWidgetConfig);
    } else {
        console.error('La configuración del chat no está disponible');
    }
});
