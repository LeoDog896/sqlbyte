import JSON5 from 'json5'
import { fakeSchema } from './fakeSchema'

export async function grabTableNames(): Promise<string[]> {
    const modules = import.meta.glob(`./data/*.jsonc`, { eager: true, as: 'raw' })

    const moduleNames = Object.keys(modules).map(module => {
        const splitArr = module.split("/")
        return splitArr[splitArr.length - 1].split(".")[0]
    })

    return moduleNames;
}

export async function grabTable(tableName: string): Promise<any> {
    const module = await import(`./data/${tableName}.jsonc?raw`)
    return JSON5.parse(module.default)
}

export async function grabTablePairs(): Promise<{ name: string, schema: any }[]> {
    const moduleNames = await grabTableNames()

    const modulePromises = moduleNames.map(async name => {
        const schema = await grabTable(name)
        return { name, schema }
    })

    return Promise.all(modulePromises)
}

type SQLType = "TEXT" | "INTEGER" | "BOOLEAN"

function schemaTypeToSQLType(type: string): SQLType {
    switch (type) {
        case "string":
            return "TEXT"
        case "number":
            return "INTEGER"
        case "boolean":
            return "BOOLEAN"
        default:
            return "TEXT"
    }
}

/**
 * Generates a query to create a table from a schema
 * @param tableName - name of the table
 * @param table - the table data (generated 
 * @param db 
 * @param schema 
 */
export async function schemaQueryCreate(tableName: string, schema: any): Promise<string> {
    const properties = schema.items.properties
    const headers = Object.keys(properties).map(header => {
        return {
            header,
            type: schemaTypeToSQLType(properties[header].type)
        }
    })
    
    const data = fakeSchema(schema) as any

    return `CREATE TABLE ${tableName} (${headers.map(({ header, type }) => `${header} ${type}`).join(", ")});
    INSERT INTO ${tableName} VALUES ${
        data.map((row: any) => `(${
            headers.map(({ header, type }) => {
                const value = row[header]
                switch (type) {
                    case "TEXT":
                        return `"${value}"`
                    default:
                        return value
                }
            }
            ).join(", ")
        })`).join(", ")
    };`

}