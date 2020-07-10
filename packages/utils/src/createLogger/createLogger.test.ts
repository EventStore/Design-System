import { createLogger } from './createLogger';

describe('createLogger', () => {
    const logs = {
        log: jest.spyOn(console, 'log').mockImplementation(),
        warn: jest.spyOn(console, 'warn').mockImplementation(),
        error: jest.spyOn(console, 'error').mockImplementation(),
        groupCollapsed: jest
            .spyOn(console, 'groupCollapsed')
            .mockImplementation(),
        groupEnd: jest.spyOn(console, 'groupEnd').mockImplementation(),
    };

    test('should create a prefixed logging function', () => {
        {
            const logger = createLogger('hello', 'pink');
            expect(logger).toBeDefined();
        }

        {
            const logger = createLogger('hello', 'pink');

            logger.log('hello');
            logger.log('hello');
            expect(logs.log).toHaveBeenCalledTimes(2);
            expect(logs.log).lastCalledWith('[hello]', 'hello');

            logger.warn('Hi there');
            expect(logs.warn).toHaveBeenCalledTimes(1);
            expect(logs.warn).lastCalledWith('[hello]', 'Hi there');

            logger.error('ut oh !');
            expect(logs.error).toHaveBeenCalledTimes(1);
            expect(logs.error).lastCalledWith('[hello]', 'ut oh !');
        }
    });

    test('should allow logs to be called once, with the .once postfix', () => {
        {
            const logger = createLogger('hello', 'pink');

            logger.log.once('hello');
            logger.log.once('different');
            logger.log.once('hello');
            logger.log.once('hello');
            logger.log.once('different');
            logger.log.once('hello');
            logger.log.once('different');
            logger.log.once('different');
            logger.log.once('hello');
            logger.log.once('different');
            expect(logs.log).toHaveBeenCalledTimes(2);
            expect(logs.log).toHaveBeenCalledWith('[hello]', 'hello');
            expect(logs.log).toHaveBeenCalledWith('[hello]', 'different');

            logger.warn.once('Hi there');
            logger.warn.once('Hi there');
            logger.warn.once('Hi there');
            logger.warn.once('Hi there');
            logger.warn.once('Hi there');
            logger.warn.once('Hi there');
            expect(logs.warn).toHaveBeenCalledTimes(1);
            expect(logs.warn).lastCalledWith('[hello]', 'Hi there');

            logger.error.once('ut oh !');
            logger.error.once('ut oh !');
            logger.error.once('ut oh !');
            logger.error.once('ut oh !');
            logger.error.once('ut oh !');
            logger.error.once('ut oh !');
            logger.error.once('ut oh !');
            expect(logs.error).toHaveBeenCalledTimes(1);
            expect(logs.error).lastCalledWith('[hello]', 'ut oh !');
        }
    });

    describe('subscriptions', () => {
        test('should be possible to subscribe to logs', () => {
            {
                const subscription = jest.fn();
                const unsubscribe = createLogger.subscribe(subscription);

                const logger = createLogger('logger name', 'pink');
                const logger2 = createLogger('logger 2; the return', 'red');

                logger.log('hello');
                logger.log('hello');
                expect(subscription).toHaveBeenCalledTimes(2);
                expect(subscription).lastCalledWith({
                    group: [],
                    level: 'info',
                    logger: 'logger name',
                    message: ['hello'],
                });

                logger2.log('number 2');
                expect(subscription).toHaveBeenCalledTimes(3);
                expect(subscription).lastCalledWith({
                    group: [],
                    level: 'info',
                    logger: 'logger 2; the return',
                    message: ['number 2'],
                });

                logger.warn('Hi there');
                expect(subscription).toHaveBeenCalledTimes(4);
                expect(subscription).lastCalledWith({
                    group: [],
                    level: 'warn',
                    logger: 'logger name',
                    message: ['Hi there'],
                });

                logger.error('ut oh !');
                expect(subscription).toHaveBeenCalledTimes(5);
                expect(subscription).lastCalledWith({
                    group: [],
                    level: 'error',
                    logger: 'logger name',
                    message: ['ut oh !'],
                });

                unsubscribe();
            }
        });

        test('should handle groups', () => {
            {
                const subscription = jest.fn();
                const unsubscribe = createLogger.subscribe(subscription);

                const logger = createLogger('logger name', 'pink');

                logger.log('hello');
                expect(subscription).toHaveBeenCalledTimes(1);
                expect(subscription).lastCalledWith({
                    group: [],
                    level: 'info',
                    logger: 'logger name',
                    message: ['hello'],
                });

                logger.groupCollapsed('group 1');

                logger.log('hello');
                expect(subscription).toHaveBeenCalledTimes(2);
                expect(subscription).lastCalledWith({
                    group: [['group 1']],
                    level: 'info',
                    logger: 'logger name',
                    message: ['hello'],
                });

                logger.groupCollapsed('group 2', 'more info');

                logger.warn('Hi there');
                expect(subscription).toHaveBeenCalledTimes(3);
                expect(subscription).lastCalledWith({
                    group: [['group 1'], ['group 2', 'more info']],
                    level: 'warn',
                    logger: 'logger name',
                    message: ['Hi there'],
                });

                logger.groupEnd();

                logger.error('ut oh !');
                expect(subscription).toHaveBeenCalledTimes(4);
                expect(subscription).lastCalledWith({
                    group: [['group 1']],
                    level: 'error',
                    logger: 'logger name',
                    message: ['ut oh !'],
                });

                logger.groupEnd();

                unsubscribe();
            }
        });

        test('should handle multiple subscriptions', () => {
            {
                const subscription = jest.fn();
                const subscription2 = jest.fn();
                const subscriptions = [
                    createLogger.subscribe(subscription),
                    createLogger.subscribe(subscription2),
                ];

                const logger = createLogger('logger name', 'pink');
                const logger2 = createLogger('logger 2; the return', 'red');

                logger.log('hello');
                logger.log('hello');
                expect(subscription).toHaveBeenCalledTimes(2);
                expect(subscription2).toHaveBeenCalledTimes(2);

                logger2.log('number 2');
                expect(subscription).toHaveBeenCalledTimes(3);
                expect(subscription2).toHaveBeenCalledTimes(3);

                logger.warn('Hi there');
                expect(subscription).toHaveBeenCalledTimes(4);
                expect(subscription2).toHaveBeenCalledTimes(4);

                logger.error('ut oh !');
                expect(subscription).toHaveBeenCalledTimes(5);
                expect(subscription2).toHaveBeenCalledTimes(5);

                subscriptions.forEach((unsub) => unsub());
            }
        });

        test('should silently fail on errors', () => {
            {
                const subscription = jest.fn(() => {
                    throw new Error('subscription error');
                });
                const subscription2 = jest.fn();
                const subscriptions = [
                    createLogger.subscribe(subscription),
                    createLogger.subscribe(subscription2),
                ];

                const logger = createLogger('logger name', 'pink');
                const logger2 = createLogger('logger 2; the return', 'red');

                logger.log('hello');
                logger.log('hello');
                expect(subscription).toHaveBeenCalledTimes(2);
                expect(subscription2).toHaveBeenCalledTimes(2);

                logger2.log('number 2');
                expect(subscription).toHaveBeenCalledTimes(3);
                expect(subscription2).toHaveBeenCalledTimes(3);

                logger.warn('Hi there');
                expect(subscription).toHaveBeenCalledTimes(4);
                expect(subscription2).toHaveBeenCalledTimes(4);

                logger.error('ut oh !');
                expect(subscription).toHaveBeenCalledTimes(5);
                expect(subscription2).toHaveBeenCalledTimes(5);

                subscriptions.forEach((unsub) => unsub());
            }
        });
    });

    afterEach(() => {
        for (const mock of Object.values(logs)) {
            mock.mockClear();
        }
    });

    afterAll(() => {
        for (const mock of Object.values(logs)) {
            mock.mockRestore();
        }
    });
});
