import csv
import json
import urllib


def main():
    result = {}

    for row in read_csv():
        first_name = row[0].strip()
        last_name = row[1].strip()
        role = row[2].strip()
        image = row[3].strip()
        if image == "--":
            image = None
        short_name = "{} {}".format(first_name, last_name[0])
        id = urllib.quote(short_name)
        entry = {
            "id": id,
            "name": short_name,
            "role": role,
            "image": image,
        }
        result[id] = entry

    # Save to leaders.json
    with open('dump/leaders.json', 'w') as jsonfile:
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
