const exit = () => {
    console.log(`Thank you for using File Manager, ${process.env.npm_config_username}, goodbye!`);
    process.exit();
};

export default exit;
