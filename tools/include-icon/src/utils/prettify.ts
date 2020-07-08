import { extname } from 'path';
import { BuiltInParserName, resolveConfig, format } from 'prettier';

const chooseParser = (destination: string): BuiltInParserName | undefined => {
    switch (extname(destination)) {
        case '.ts':
        case '.tsx':
            return 'babel-ts';
        case '.json':
            return 'json';
    }
};

export const prettify = async (file: string, destination: string) => {
    const prettierConfig = await resolveConfig(destination);
    const parser = chooseParser(destination);
    return format(file, {
        ...(prettierConfig || {}),
        parser,
    });
};
