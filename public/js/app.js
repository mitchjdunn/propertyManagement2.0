window.addEventListener('load', () => {
    const el = $('#app');

    // Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const ratesTemplate = Handlebars.compile($('#rates-template').html());
    const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
    const historicalTemplate = Handlebars.compile($('#historical-template').html());

    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = errorTemplate({
                color: 'yellow',
                title: '404 -- page not found',
                message: `The path '/${path}' does not exist`,
            });
            el.html(html);
        },

    });

    const api = axios.create({
        baseURL: 'http://localhost:3000/api',
        timeout: 5000,
    });

    //Display Error Banner
    const showError = (error) => {
        const { title, message } = error.response.data;
        const html = errorTemplate({ color: 'red', title, message });
        el.html(html);
    };

    // Display Latest Currency Rates
    router.add('/', async () => {
        let html = ratesTemplate();
        el.html(html);
        try {
            // Load Currency Rate
            const response = await api.get('rates');
            const { base, date, rates } = response.data;

            // Display Rates Table
            html = ratesTemplate({base, date, rates});
            el.html(html);
        } catch (error) {
            showError(error);
        } finally {
            // Remove Loader status
            $('.loading').removeClass('loading');
        }
    });

    router.add('/exchange', () => {
        let html = exchangeTemplate;
        el.html(html);
    });

    router.add('/historical', () => {
        let html = historicalTemplate;
        el.html(html);
    });

    // navigate app to current url
    router.navigateTo(window.location.pathname);

    // highight current path in menu
    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', event => {
        // prevent broswser to laod
        event.preventDefault();

        //highlight active menu item on click
        const target = $(event.target);
        $('.item').removeClass('active');
        target.addClass('active');

        //navigate to clicked url
        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
    });

});
