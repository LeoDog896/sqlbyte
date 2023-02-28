import jsf from 'json-schema-faker';
import { remark } from 'remark';
import html from 'remark-html';

export const lessonParser = async (lesson: string) => {
    // dont use jsf for now, just turn lesson from markdown to html
    // const fakeLesson = jsf.generate(lesson);
    const processedLesson = await remark().use(html).process(lesson);
    const htmlLesson = processedLesson.toString();
    return htmlLesson;
};
