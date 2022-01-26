
const numberObj = { };

const idCreator = () => {
    const num = Math.floor(Math.random()*(10000000000));

    if (numberObj[num]) {
        return idCreator();
    } else {
        numberObj[num] = num;
        return num;
    };
}

const idGenerator = (req, res, next) => {


    if (req.path === '/users/user-data') return next();

    res.sendRes = res.send;

    res.send = (body) => {
        body.articles.map(article => {
            article.id = idCreator();
        });
        res.sendRes(JSON.stringify(body));
    }

    next();
};

export default idGenerator;
