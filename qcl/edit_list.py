import json

data = []

with open('read_list/list.json', 'r') as read_file:
	data = json.load(read_file);

new = [];

recent_level = "Most Recent Change: ";

def move_level(index, to):

	to -= 1;
	index -= 1;

	global recent_level;
	
	recent_level += "Moved '" + data[index]['name'] + "' from " + str(data[index]['pos']) + " to " + str(data[to]['pos']);

	if (index > to):
		for x in data:
			if (x['pos'] > to and x['pos'] != to and x['pos'] <= index):
				x['pos'] += 1;

		data[index]['pos'] = to + 1;
		data.insert(to, data[index]);
		data.pop(index+1);
	elif (index < to):
		counter = 0;
		for x in data:
			if (x['pos'] < to+1 and x['pos'] != index):
				data[counter]['pos'] -= 1;
			elif (x['pos'] == to+1 and x['pos'] != index):
				data[counter]['pos'] -= 1;
			counter += 1;

		data[index]['pos'] = to + 1;
		data.insert(to+1, data[index]);
		data.pop(index);

def add_level(name, creator, id_, pos):
	global recent_level;
	recent_level += "Added '" + name + "' at " + str(pos);

	counter = 0;
	for x in data:
		if (data[counter]['pos'] >= pos):
			data[counter]['pos'] += 1;
		counter += 1;

	temp = {"pos": pos, "name": name, "creator": creator, "id": id_};

	data.insert(pos-1, temp);

def remove_level(pos):
	global recent_level;
	recent_level += "Removed '" + data[pos-1]['name'] + "' (" + str(data[pos-1]['pos']) + ")";

	counter = 0;
	for x in data:
		if (data[counter]['pos'] >= pos):
			data[counter]['pos'] -= 1;
		counter += 1;

	data.pop(pos-1);

ans = input("Add, remove, or move? ");

if (ans == "add"):
	name = input("Name of level: ");
	creator = input("Uploader: ");
	id_ = int(input("ID: "));
	pos = int(input("Position on list: "));
	add_level(name, creator, id_, pos);

if (ans == "remove"):
	pos = int(input("Position of level to remove: "));
	remove_level(pos);

if (ans == "move"):
	initial_index = int(input("Position of level to move: "));
	end_index = int(input("Position of where you want it: "));

	move_level(initial_index, end_index);

with open('read_list/list.json', 'w') as write_file:
	json.dump(data, write_file, indent=4)
	
with open('recent_change.txt', 'w') as recent:
	recent.write('recent = `' + recent_level + '`');

with open('list.json', 'w') as write_file:
	write_file.write("listJSON = `")
	json.dump(data, write_file, indent=4)
	write_file.write("`");