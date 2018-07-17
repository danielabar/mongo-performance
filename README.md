<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [MongoDB Performance](#mongodb-performance)
  - [Chapter 1](#chapter-1)
    - [Lecture: Hardware Considerations and Configurations Part 1](#lecture-hardware-considerations-and-configurations-part-1)
    - [Lecture: Hardware Considerations and Configurations Part 2](#lecture-hardware-considerations-and-configurations-part-2)
    - [Lab 1.1: Install Course Dependencies](#lab-11-install-course-dependencies)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# MongoDB Performance

> My course notes from M201: MongoDB Performance at [MongoDB University](https://university.mongodb.com/)

## Chapter 1

### Lecture: Hardware Considerations and Configurations Part 1

Out of scope: Full discussion of how to tune and size hardware for given deployment. But will cover the basics.

![Von Neumann Architecture](images/vn-arch.png "Von Neumann Architecture")

Main resources MongoDB relies on to operate:
- CPU for processing and calculations
- Memory for execution -> IMPORTANT!
- Disk and IO for persistency and communications between servers or within host processes

**Memory**

RAM having come down in price makes prevalence of dbs that are designed around usage of memory. It's also 25x faster than SSD's.

Operations depending heavily on memory include:
- Aggregation
- Index Traversing
- Write Operations
- Query Engine (to retrieve query results)
- Connections (~1MB per established connection)

Generally, the more memory MongoDB has available to it, the better its performance will be.

**CPU**

Used by all applications, database is just one of them. Two main factors of MongoDB associated with CPU:
- Storage Engine
- Concurrency Model

By default, MongoDB will try to use all available cores to respond to incoming requests.

Non locking Storage Engine - WiredTiger - relies heavily on CPU to process requests.

If have non-blocking operations (eg: concurrent writes of documents, or responding to query requests - reads), MongoDB performs better the more CPU resources are available.

Operations requiring availability of CPU cycles:
- Page Compression
- Data Calculation
- Aggrgation Framework Operations
- Map Reduce

### Lecture: Hardware Considerations and Configurations Part 2

Not all reads and writes are non blocking operations, such as writing constantly to same document (in-place update) requires each write to block all other writes on that document. eg: given a document

```javascript
{
  _id: "FC Porto",
  message: "Best Club in the World!",
  championships: 756
}
```

And the following series of numerous updates:

```javascript
db.clubs.update({_id: 'FC Porto'}, {$inc: {championship : 1}})
db.clubs.update({_id: 'FC Porto'}, {$inc: {championship : 1}})
...
db.clubs.update({_id: 'FC Porto'}, {$inc: {championship : 1}})
```

In above case, multiple cpu's won't help performance because this work cannot be done in parallel, because they all affect the same document.

**IOPS**

MongoDB uses disk to persist data. IOPS: Input/Output operations per second provided by server. The faster this is, the faster mongo can read/write data. Type of disk will greatly affect MongoDB performance.

![iops](images/vn-arch.png "iops")

Disks can be used in different architectures such as RAID for redundancy of read and write operations.

![raid](images/raid.png "raid")

MongoDB benefits from some but not all architectures.

Recommended raid architecture for MongoDB is RAID LEVEL 10. Offers more redundancy and safeguard guarantees with good performance combination.

DO NOT USE RAID 5, RAID 6. Also avoid RAID 0 - has good write performance but limited availability, can lead to reduced performance on read operations.

RAID 10 provides benefits needed by MongoDB:
- Redundancy of segments across physical drives
- Allows extended performance due to parallelization of multiple writes, reads and reads and writes in same disk allocated segments.

Important aspect of MongoDB is the need to write to several different disks. This distributes IO load of different databases, indexes, journaling and lock files -> optimizes performance.

**Network**

MongoDB is a distributed database for high availability, therefore deployment also depends on network hardware. Faster and larger is bandwidth for network -> better performance.

![network](images/network.png "network")

- Applications reach database by establishing connections to host where MongoDB instance is running.
- High availability achieved with replica cluster sets.
- Horizontal scaling achieved with sharding cluster.

The way that different hosts that are holding different nodes of cluster are connected will affect performance. Other considerations include:
- Types of network switches
- Load balancer
- Firewalls
- How far apart cluster nodes are (across different data centers or regions)
- Types of connections between data centers (i.e. latency - can't go faster than speed of light)

Application, while emitting commands can set:
- Write Concern
- Read Concern
- Read Preference

These need to be taken into consideration when analyzing performance of application.

### Lab 1.1: Install Course Dependencies

Attempt course with Docker:

```shell
docker pull mongo:4.0.0
docker run \
  -p 27018:27017 \
  --name course-mongo \
  -v $(pwd)/input:/data/configdb \
  -v course-mongo-data:/data/db \
  -d mongo:4.0.0
docker exec -it course-mongo bash
mongoimport --db m201 --collection people --file /data/configdb/people.json
mongo
show dbs
use m201
db.people.count({ "email" : {"$exists": 1} })
# submit answer
```

Also install [Compass](https://www.mongodb.com/download-center#compass)