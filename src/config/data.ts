// {
//     "teamCode": "team123",
//     " participantType":"individual",
//     "memberOne": {
//       "firstName": "Alice",
//       "lastName": "Johnson",
//       "institute": "Engineering College",
//       "mobileNumber": "1122334455",
//       "email": "sachinksiby@gmail.com"
//     },
//     "memberTwo": {
//       "firstName": "Bob",
//       "lastName": "Williams",
//       "institute": "Tech University",
//       "mobileNumber": "2233445566",
//       "email": "sachinksiby1891@gmail.com"
//     },
//     "memberThree": {
//       "firstName": "Charlie",
//       "lastName": "Brown",
//       "institute": "Science Institute",
//       "mobileNumber": "3344556677",
//       "email": "sachinksibymuttar@gmail.com"
//     }
//   }

/*


async findEvent(eventId: string) {
    console.log(eventId, "eve");

    const eventData = await Event.findById(eventId)
      .populate({
        path: "participants",
        model: "Participant",
        populate: {
          path: "members",
          model: "User",
        },
      })
      .exec();
    console.log(eventData);
    return eventData;
  }
  async addEvent(eventData: IEvent): Promise<any> {
    const eventEntry: IEvent = await Event.create(eventData);

    return eventEntry;
  }

  async deleteEvent(eventId: string): Promise<boolean> {
    const eventEntry = await Event.findByIdAndDelete(eventId);

    if (!eventEntry) {
      throw new Error("Event not found");
    } else {
      return true;
    }
  }







*/
