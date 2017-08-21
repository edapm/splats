import csv
import json


def main():
    result = []

    for row in read_csv():
        first_name = row[0].strip()
        last_name = row[1].strip()
        role = row[2].strip()
        image = row[3].strip()
        if image == "--":
            image = None
        entry = {
            "name": "{} {}".format(first_name, last_name[0]),
            "role": role,
            "img": image,
        }
        result.append(entry)

    # Save to leaders.json
    with open('data/leaders.json', 'w') as jsonfile:
        json.dump(result, jsonfile, indent=4, sort_keys=True)


def read_csv():
    # Load/parse file
    with open('dump/leaders.csv', 'r') as csvfile:
        reader = csv.reader(csvfile)

        for i, row in enumerate(reader):
            if i != 0:
                yield row


if __name__ == '__main__':
    main()
