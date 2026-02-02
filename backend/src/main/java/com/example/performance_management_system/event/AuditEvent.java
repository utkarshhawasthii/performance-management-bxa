package com.example.performance_management_system.event;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

public class AuditEvent {

    public String eventId;
    public EventType eventType;
    public DomainType domain;
    public String aggregateId;     // entity id as string
    public Actor actor;
    public Instant timestamp;
    public Map<String, Object> payload;

    private AuditEvent() {}

    public static AuditEvent of(
            EventType eventType,
            DomainType domain,
            String aggregateId,
            Actor actor,
            Map<String, Object> payload
    ) {
        AuditEvent event = new AuditEvent();
        event.eventId = UUID.randomUUID().toString();
        event.eventType = eventType;
        event.domain = domain;
        event.aggregateId = aggregateId;
        event.actor = actor;
        event.timestamp = Instant.now();
        event.payload = payload;
        return event;
    }
}
